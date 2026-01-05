# Image Optimization Guide

## Overview

This project uses modern image formats (AVIF, WebP) with automatic fallbacks to optimize loading performance.

## How to Use

### Option 1: OptimizedImage Component (Recommended)

Use the `<OptimizedImage>` component for automatic format selection:

```tsx
import { OptimizedImage } from '@/components/optimized-image'

<OptimizedImage
  src="/images/hero-bg.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  sizes="100vw"
  loading="lazy"
/>
```

The component automatically serves:
1. AVIF if supported (best compression, ~50% smaller)
2. WebP if AVIF not supported (~30% smaller)
3. Original format as fallback

### Option 2: Vite Imagetools (Advanced)

For more control, import images with directives:

```tsx
import heroImage from '@/assets/hero-bg.jpg?format=webp;avif;jpg&quality=85'

<img src={heroImage} alt="Hero" />
```

Available directives:
- `format`: Output formats (e.g., `webp;avif;jpg`)
- `quality`: Compression quality (0-100, default 85)
- `width`: Resize width in pixels
- `height`: Resize height in pixels
- `thumbnail`: Generate thumbnail (800px width, quality 80)

## Converting Existing Images

Run the conversion script to create WebP/AVIF versions:

```bash
./scripts/convert-images.sh
```

This will:
- Convert all JPG/PNG files in `src/assets/` to WebP
- Attempt AVIF conversion (requires libavif)
- Preserve original files as fallbacks

## File Size Comparisons

Based on our assets:

| Image | Original (JPG) | WebP | Savings |
|-------|---------------|------|---------|
| hero-bg | 173KB | 128KB | 26% |
| about-bg | 182KB | 139KB | 24% |
| logo | 57KB | 20KB | 65% |
| project-1 | 92KB | 86KB | 7% |
| project-2 | 77KB | 65KB | 16% |
| project-3 | 137KB | 120KB | 12% |

**Total savings**: ~30% average reduction

## Best Practices

1. **Always provide width/height** to prevent layout shift
2. **Use `loading="lazy"`** for below-fold images
3. **Set `priority={true}`** for above-fold critical images
4. **Provide descriptive alt text** for accessibility
5. **Use `sizes` attribute** for responsive images

## Browser Support

- **AVIF**: Chrome 85+, Firefox 93+, Safari 16+
- **WebP**: Chrome 23+, Firefox 65+, Safari 14+
- **Fallback**: All browsers (JPG/PNG)

The component automatically selects the best format supported by the user's browser.

## Performance Impact

- **Initial load**: ~30% reduction in image bytes
- **Core Web Vitals**: Improved LCP (Largest Contentful Paint)
- **Bandwidth savings**: Significant for users on mobile networks
