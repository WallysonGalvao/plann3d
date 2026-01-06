#!/bin/bash

# Script to convert images to WebP and AVIF formats
# Requires ImageMagick (brew install imagemagick)

set -e

ASSETS_DIR="/Users/wallysongalvao/Documents/workspace/plann3d/src/assets"

echo "Converting images to WebP and AVIF formats..."
echo ""

# Counter for converted files
CONVERTED=0

# Convert JPG/PNG to WebP and AVIF
for img in "$ASSETS_DIR"/*.jpg "$ASSETS_DIR"/*.jpeg "$ASSETS_DIR"/*.png; do
  # Check if file exists (glob returns pattern if no match)
  [ -f "$img" ] || continue

  # Get filename without extension
  filename="${img%.*}"
  basename=$(basename "$filename")

  echo "Processing: $basename"

  # Convert to WebP (quality 85)
  if [ ! -f "${filename}.webp" ]; then
    convert "$img" -quality 85 "${filename}.webp"
    echo "  ✓ Created WebP"
  else
    echo "  ⊙ WebP already exists"
  fi

  # Convert to AVIF (quality 80, best compression)
  if [ ! -f "${filename}.avif" ]; then
    convert "$img" -quality 80 "${filename}.avif" 2>/dev/null || echo "  ⚠ AVIF conversion not supported (install libavif)"
  else
    echo "  ⊙ AVIF already exists"
  fi

  echo ""
  ((CONVERTED++))
done

echo "✨ Conversion complete! Processed $CONVERTED image(s)"
echo ""
echo "Next steps:"
echo "1. Use <OptimizedImage> component in your code"
echo "2. Test in browser to verify format serving"
echo "3. Run lighthouse audit to measure improvements"
