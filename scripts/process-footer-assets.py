#!/usr/bin/env python3
from __future__ import annotations
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "footer"
OUT = SRC # Output in the same directory

TOLERANCE = 42

def remove_background(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    rgb = np.asarray(im, dtype=np.int16)[:, :, :3]
    h, w = rgb.shape[:2]
    corners = np.stack([rgb[0, 0], rgb[0, w - 1], rgb[h - 1, 0], rgb[h - 1, w - 1]]).astype(np.int16)
    bg = np.median(corners, axis=0)
    dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
    similar = dist < TOLERANCE
    labels, count = ndimage.label(similar)
    if count == 0:
        return im
    border = np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]])
    background_labels = set(np.unique(border)) - {0}
    if not background_labels:
        return im
    is_background = np.isin(labels, list(background_labels))
    is_foreground = ~is_background
    fg_labels, fg_count = ndimage.label(is_foreground)
    if fg_count > 1:
        min_area = max(16, int(0.0005 * h * w))
        sizes = ndimage.sum(is_foreground, fg_labels, range(1, fg_count + 1))
        keep = {i + 1 for i, size in enumerate(sizes) if size >= min_area}
        if keep:
            is_foreground = np.isin(fg_labels, list(keep))
            
    is_foreground = ndimage.binary_erosion(is_foreground, iterations=6)

    alpha = np.where(is_foreground, 255, 0).astype(np.uint8)
    alpha_im = Image.fromarray(alpha, mode="L")
    alpha_im = alpha_im.filter(ImageFilter.GaussianBlur(1.0))
    out = im.copy()
    out.putalpha(alpha_im)
    return out

def trim(im: Image.Image) -> Image.Image:
    bbox = im.getchannel("A").getbbox()
    return im.crop(bbox) if bbox else im

def fit(im: Image.Image, target_long_edge: int) -> Image.Image:
    long_edge = max(im.size)
    if long_edge <= target_long_edge:
        return im
    ratio = target_long_edge / long_edge
    size = (max(1, round(im.width * ratio)), max(1, round(im.height * ratio)))
    return im.resize(size, Image.LANCZOS)

def save(im: Image.Image, name: str) -> tuple[str, int, int, int]:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{name}.webp"
    im.save(path, "WEBP", quality=82, method=6)
    return path.name, im.width, im.height, path.stat().st_size

CUTOUTS = [
    ("amongus.png", "amongus-cut", 360),
    ("blackhole.png", "blackhole-cut-v2", 360),
    ("cat.jpg", "cat-cut", 360),
    ("computer.png", "computer-cut", 360),
]

def main():
    rows = []
    for source, name, long_edge in CUTOUTS:
        path = SRC / source
        if not path.exists():
            continue
        before = path.stat().st_size
        im = remove_background(Image.open(path))
        im = fit(trim(im), long_edge)
        out_name, w, h, size = save(im, name)
        rows.append(("cutout", out_name, w, h, before, size))
    print(rows)

if __name__ == "__main__":
    main()
