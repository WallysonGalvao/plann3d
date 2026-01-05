# Modelos 3D

Este diretório contém os modelos 3D usados no visualizador interativo do site.

## Formato Recomendado

**glTF Binary (.glb)** - Formato compacto e otimizado para web.

## Tamanho Máximo

Modelos devem ter no máximo **10MB** para boa performance.
Para modelos maiores, considere usar compressão Draco.

## Como Exportar

### SketchUp

1. Instale o plugin [SketchUp to glTF](https://extensions.sketchup.com/extension/052071d5-2b03-4d9e-b038-a0b6aa4e0c8e/gl-tf-exporter)
2. File → Export → 3D Model → glTF
3. Escolha formato "GLB (Binary)"

### Blender

1. File → Export → glTF 2.0 (.glb/.gltf)
2. Em "Format", selecione "glTF Binary (.glb)"
3. Marque "Compress" para reduzir tamanho

### Twinmotion

1. Export → Datasmith ou FBX
2. Importe no Blender
3. Exporte como .glb seguindo passos acima

### Tekla

1. Export → IFC
2. Use [ifc-to-gltf](https://github.com/nicbre/ifc-gltf) ou importe no Blender
3. Exporte como .glb

## Estrutura de Pastas

```
public/models/
├── torre-de-tv/
│   ├── model.glb       # Modelo principal
│   └── thumbnail.jpg   # Preview estático
├── outro-projeto/
│   ├── model.glb
│   └── thumbnail.jpg
└── README.md           # Este arquivo
```

## Otimização

Para modelos grandes, use [gltf-transform](https://gltf-transform.donmccurdy.com/cli):

```bash
# Comprimir com Draco
npx @gltf-transform/cli optimize input.glb output.glb --compress draco

# Reduzir texturas
npx @gltf-transform/cli optimize input.glb output.glb --texture-compress webp
```
