# Hero assets

Drop the landing section's real images here, then point `src/content/hero-assets.ts` at them.

## What goes in this folder

| Slot | Count | Notes |
|------|-------|-------|
| Flank photos | 10 | Event and team photos. Landscape, portrait and square all work, the manifest carries each one's aspect ratio. |
| `landing-end` | 1 | The character that peeks over the torn paper edge. |
| Logo | 1 | Or put it in `public/` if it is also used as a favicon. |

## Adding one

```ts
// src/content/hero-assets.ts
import demoDay from '@/assets/hero/demo-day.jpg'

// ...then on the slot you want:
{
  id: 'l1',
  src: demoDay,
  alt: 'Two students demoing a prototype to a panel at Demo Day 2025',
  width: 1600,   // the file's real intrinsic pixel dimensions
  height: 1200,
  // position, rotation, tier and shape are already set
}
```

`width` and `height` must be the file's actual dimensions. They reserve the box before the image loads, which is what keeps layout shift at zero. Everything else about the slot is already tuned.

## Before you commit an image

- Resize so the longest edge is at most 1600px. The frames render between 80px and 220px wide, so anything larger is wasted bytes.
- Export as `.webp` where you can, `.jpg` otherwise.
- Write real alt text describing what the photo shows. Every slot currently carries a `COPY-PENDING` placeholder that needs replacing.

## Background removal

Only the `landing-end` graphic and the logo need transparent backgrounds; the photos sit inside frames and do not.

If a graphic arrives on a flat white or single-colour background, that colour can be keyed out programmatically. A photographic subject cut from a real scene needs a proper matting tool, not a colour key. Export those with transparency from the source file instead.
