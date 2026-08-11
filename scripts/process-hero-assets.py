#!/usr/bin/env python3
"""
Turn the raw assets in `src/assets/` into web-ready files in `src/assets/hero/`.

Run from the repo root:

    python3 scripts/process-hero-assets.py

Originals stay untouched and remain the source of truth. Re-run this whenever a
raw asset is added or replaced.

Three things happen here.

1. BACKGROUND REMOVAL, for the stickers and the landing-end graphic.

   These arrive as die-cut art sitting on a flat white or black ground. The
   naive fix, "delete every white pixel", destroys them: the stickers have white
   die-cut outlines, the ghost is a white character, the landing-end cat is
   white. All of that is interior white that has to survive.

   So instead of matching on colour alone, this floods in from the border and
   removes only the background region that is actually connected to the edge.
   Interior whites are unreachable from outside the artwork, so they stay.
   The alpha edge is then feathered by one pixel, because a hard binary cutout
   shows stair-stepping on a diagonal.

2. TRIM to the remaining content, so a graphic's box is the artwork rather than
   the artwork plus a margin of dead transparency.

3. RESIZE AND ENCODE to WebP at roughly 2x the largest size each asset is ever
   rendered at, so it stays sharp on a high-density display. The originals total
   19MB; the derivatives total about 810KB.
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets"
OUT = SRC / "hero"

# Colour distance under which a pixel counts as "same as the background".
# Generous enough to absorb JPEG-ish noise and the soft ramp around a sticker,
# tight enough not to eat the artwork.
TOLERANCE = 42


def remove_background(im: Image.Image) -> Image.Image:
    """Key out the flat ground a sticker was exported on, keeping interior colour."""
    im = im.convert("RGBA")
    rgb = np.asarray(im, dtype=np.int16)[:, :, :3]

    # The background colour is whatever dominates the four corners.
    h, w = rgb.shape[:2]
    corners = np.stack(
        [rgb[0, 0], rgb[0, w - 1], rgb[h - 1, 0], rgb[h - 1, w - 1]]
    ).astype(np.int16)
    bg = np.median(corners, axis=0)

    # Everything close to that colour, anywhere in the image.
    dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
    similar = dist < TOLERANCE

    # Keep only the parts of that mask reachable from the border. This is what
    # protects the white die-cut outlines and the white characters.
    labels, count = ndimage.label(similar)
    if count == 0:
        return im

    border = np.concatenate(
        [labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]]
    )
    background_labels = set(np.unique(border)) - {0}
    if not background_labels:
        return im

    is_background = np.isin(labels, list(background_labels))
    is_foreground = ~is_background

    # Drop specks. Some sources carry a stray mark in a corner, and because the
    # trim step crops to the bounding box of whatever survives, a single stray
    # pixel cluster silently pads the whole graphic with dead space. Anything
    # under 0.05% of the frame is not artwork.
    fg_labels, fg_count = ndimage.label(is_foreground)
    if fg_count > 1:
        min_area = max(16, int(0.0005 * h * w))
        sizes = ndimage.sum(is_foreground, fg_labels, range(1, fg_count + 1))
        keep = {i + 1 for i, size in enumerate(sizes) if size >= min_area}
        if keep:
            is_foreground = np.isin(fg_labels, list(keep))

    alpha = np.where(is_foreground, 255, 0).astype(np.uint8)
    alpha_im = Image.fromarray(alpha, mode="L")
    # One pixel of feather so diagonals do not stair-step.
    alpha_im = alpha_im.filter(ImageFilter.GaussianBlur(0.6))

    out = im.copy()
    out.putalpha(alpha_im)
    return out


def trim(im: Image.Image) -> Image.Image:
    """Crop to the non-transparent content."""
    bbox = im.getchannel("A").getbbox()
    return im.crop(bbox) if bbox else im


def fit(im: Image.Image, target_long_edge: int) -> Image.Image:
    """Downscale so the longest edge is at most `target_long_edge`. Never upscale."""
    long_edge = max(im.size)
    if long_edge <= target_long_edge:
        return im
    ratio = target_long_edge / long_edge
    size = (max(1, round(im.width * ratio)), max(1, round(im.height * ratio)))
    return im.resize(size, Image.LANCZOS)


def save(im: Image.Image, name: str, *, lossless: bool = False) -> tuple[str, int, int, int]:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{name}.webp"
    if lossless:
        im.save(path, "WEBP", lossless=True, quality=100, method=6)
    else:
        im.save(path, "WEBP", quality=82, method=6)
    return path.name, im.width, im.height, path.stat().st_size


# ---------------------------------------------------------------------------
# Jobs
#
# `long_edge` is about 2x the largest size that asset is ever rendered at, which
# keeps it sharp on a high-density display without shipping a print-res file.
# Raise a number here whenever you raise that slot's `scale` in the manifest.
# ---------------------------------------------------------------------------

CUTOUTS = [
    # (source, output name, target long edge)
    ("graphic-1.png", "graphic-build-it", 420),
    ("graphic-2.png", "graphic-ecell-again", 420),
    ("graphic-3.png", "graphic-robot", 360),
    ("graphic-4.png", "graphic-1111", 360),
    ("graphic-5.png", "graphic-email-finds-you", 360),
    ("graphic-6.png", "graphic-boo", 360),
    ("landing-end.png", "landing-end", 800),
    # Stat stickers. Named for the figure they sit under, and sourced from
    # `hero/` because that is where they were committed.
    ("hero/500+graphic.png", "stat-500", 340),
    ("hero/100+graphic.png", "stat-100", 340),
    ("hero/20+graphic.png", "stat-20", 340),
    ("hero/10+graphic.png", "stat-10", 340),
]

# Already has real transparency, so it only needs resizing. Lossless keeps the
# mark's edges crisp at small sizes, and it is tiny either way.
LOGO = ("ecell-logo.png", "ecell-logo", 160)

# Photos go inside frames, so they keep their own background. Sized per slot
# from `scale * up to 17rem`, the frame ceiling set in `PhotoFrame.tsx`.
PHOTOS = [
    ("team/team-1.png", "team-1", 1120),
    ("team/team-2.png", "team-2", 680),
    ("team/team-3.png", "team-3", 520),
    ("team/team-4.png", "team-4", 710),
    ("team/team-5.png", "team-5", 820),
    ("team/team-6.png", "team-6", 850),
    ("team/team-7.png", "team-7", 920),
    ("team/team-8.png", "team-8", 1060),
    ("team/team-9.png", "team-9", 1120),
    ("team/team-10.png", "team-10", 1260),
]


def main() -> int:
    rows: list[tuple[str, str, int, int, int, int]] = []
    skipped: list[str] = []

    for source, name, long_edge in CUTOUTS:
        path = SRC / source
        if not path.exists():
            skipped.append(source)
            continue
        before = path.stat().st_size
        im = remove_background(Image.open(path))
        im = fit(trim(im), long_edge)
        out_name, w, h, size = save(im, name)
        rows.append(("cutout", out_name, w, h, before, size))

    path = SRC / LOGO[0]
    if path.exists():
        im = fit(trim(Image.open(path).convert("RGBA")), LOGO[2])
        out_name, w, h, size = save(im, LOGO[1], lossless=True)
        rows.append(("logo", out_name, w, h, path.stat().st_size, size))
    else:
        skipped.append(LOGO[0])

    for source, name, long_edge in PHOTOS:
        path = SRC / source
        if not path.exists():
            skipped.append(source)
            continue
        before = path.stat().st_size
        im = fit(Image.open(path).convert("RGB"), long_edge)
        out_name, w, h, size = save(im, name)
        rows.append(("photo", out_name, w, h, before, size))

    print(f"{'kind':8s} {'file':28s} {'size':>12s} {'before':>9s} {'after':>9s}")
    for kind, name, w, h, before, after in rows:
        print(
            f"{kind:8s} {name:28s} {f'{w}x{h}':>12s} "
            f"{before / 1024:8.0f}K {after / 1024:8.0f}K"
        )
    if skipped:
        print(
            f"\nskipped {len(skipped)} source(s) no longer in the repo; their "
            f"existing derivatives in src/assets/hero/ are unchanged:"
        )
        for name in skipped:
            print(f"  {name}")

    if not rows:
        return 0

    total_before = sum(r[4] for r in rows)
    total_after = sum(r[5] for r in rows)
    print(
        f"\ntotal {total_before / 1024 / 1024:.1f}MB -> {total_after / 1024:.0f}KB "
        f"({total_after / total_before * 100:.1f}%)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
