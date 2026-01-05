# GLTF Layer System Documentation

## Overview

The 3D viewer supports layer-based visibility control, allowing users to show/hide different parts of the model (structure, furniture, vegetation, lighting).

## How Layers Are Detected

The system uses a **3-tier fallback approach** for maximum compatibility:

### Priority 1: GLTF Extras Metadata (Recommended)
Export your model with custom properties in the `extras` field:

```json
{
  "extras": {
    "layer": "structure"
  }
}
```

**Supported values**: `structure`, `furniture`, `vegetation`, `lighting`

### Priority 2: Material Names
If no `extras` metadata exists, the system checks material names:
- Material named `"Wall_Material"` → Structure layer
- Material named `"Chair_Wood"` → Furniture layer

### Priority 3: Object Names (Fallback)
Finally, checks object/mesh names:
- Object named `"Floor_Mesh"` → Structure layer
- Object named `"Tree_01"` → Vegetation layer

## Keyword Mapping

### Structure Layer
- Keywords: `structure`, `wall`, `floor`, `ceiling`, `roof`, `foundation`
- Examples: `Wall_01`, `Floor_Material`, `Ceiling_Mesh`

### Furniture Layer
- Keywords: `furniture`, `chair`, `table`, `desk`, `sofa`, `bed`
- Examples: `Chair_Modern`, `Table_Wood`, `Desk_01`

### Vegetation Layer
- Keywords: `vegetation`, `tree`, `plant`, `grass`, `landscape`
- Examples: `Tree_Oak`, `Plant_Pot`, `Grass_Field`

### Lighting Layer
- Keywords: `light`, `lamp`, `bulb`, `luminaire`
- Examples: `Light_Ceiling`, `Lamp_Desk`, `Bulb_LED`

## Adding Metadata in 3D Software

### Blender
1. Select object
2. Go to Object Properties → Custom Properties
3. Add property: `layer` = `structure`
4. Export as GLTF with "Custom Properties" enabled

### 3ds Max
1. Select object
2. Add custom attribute via MAXScript:
   ```maxscript
   setUserProp $ "layer" "structure"
   ```
3. Export to GLTF

### SketchUp (via Twinmotion)
1. Organize objects into named groups
2. Use group names with layer keywords
3. Export to GLTF from Twinmotion

## Development Debugging

In development mode, the console automatically logs layer detection:

```
🔍 GLTF Layer Analysis
  📁 Structure (structure)
    Objects: 245
    Sample objects: Wall_01, Floor_Main, Ceiling_A, ...

  📁 Furniture (furniture)
    Objects: 42
    Sample objects: Chair_Modern, Table_Wood, ...
```

### Manual Debug Commands

```typescript
import { debugGLTFLayers, analyzeGLTFLayers } from '@/lib/gltf-layer-utils'

// Log layers to console
debugGLTFLayers(scene)

// Get layer data programmatically
const layers = analyzeGLTFLayers(scene)
console.log(layers)
```

## Programmatically Setting Layers

For models without metadata, you can tag objects at runtime:

```typescript
import { setLayerMetadata } from '@/lib/gltf-layer-utils'

// Tag all objects with "wall" in the name as structure
setLayerMetadata(scene, 'wall', 'structure')

// Tag specific furniture
setLayerMetadata(scene, 'chair', 'furniture')
```

## Usage in React

```tsx
<ModelViewer
  modelUrl="/models/project.glb"
  visibleLayers={{
    structure: true,
    furniture: false,    // Hide furniture
    vegetation: true,
    lighting: true,
  }}
/>
```

## Best Practices

1. **Use GLTF extras metadata** when possible (most reliable)
2. **Use descriptive material names** as a fallback
3. **Organize by naming conventions** for automatic detection
4. **Test in development** with console debugging enabled
5. **Document your layer structure** for team collaboration

## Troubleshooting

### Objects Not Hiding
- Check console for layer detection results
- Verify object/material names contain keywords
- Add explicit `extras.layer` metadata in 3D software

### Wrong Layer Assignment
- Material names may override object names
- Check for conflicting keywords (e.g., "Wall_Lamp" → structure or lighting?)
- Use explicit metadata to resolve ambiguity

### Performance Issues
- Large models with many layer changes may cause frame drops
- Consider grouping objects by layer in 3D software for batch operations
- Avoid rapid layer toggling (debounce UI controls)
