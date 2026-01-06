#!/bin/bash
# =============================================================================
# generate-lod.sh - Gera versões LOD (high/medium/low) de modelos GLB
# =============================================================================
# Uso: ./scripts/generate-lod.sh <input.glb> <output-dir>
# Exemplo: ./scripts/generate-lod.sh public/models/arena-bsb/original.glb public/models/arena-bsb
# =============================================================================

set -e

INPUT=$1
OUTPUT_DIR=$2

if [ -z "$INPUT" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "Uso: $0 <input.glb> <output-dir>"
  echo "Exemplo: $0 public/models/arena-bsb/original.glb public/models/arena-bsb"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "❌ Arquivo não encontrado: $INPUT"
  exit 1
fi

# Criar diretório de saída se não existir
mkdir -p "$OUTPUT_DIR"

# Obter tamanho original
ORIGINAL_SIZE=$(du -h "$INPUT" | cut -f1)
echo "📦 Modelo original: $INPUT ($ORIGINAL_SIZE)"
echo "📂 Diretório de saída: $OUTPUT_DIR"
echo ""

# =============================================================================
# Fase 1: Gerar HIGH.glb (compressão Draco + otimizações)
# =============================================================================
echo "🔧 [1/3] Gerando high.glb (compressão Draco, qualidade preservada)..."
npx @gltf-transform/cli optimize "$INPUT" "$OUTPUT_DIR/high.glb" \
  --compress draco

HIGH_SIZE=$(du -h "$OUTPUT_DIR/high.glb" | cut -f1)
echo "✅ high.glb criado ($HIGH_SIZE)"
echo ""

# =============================================================================
# Fase 2: Gerar MEDIUM.glb (50% triângulos + recomprimir)
# =============================================================================
echo "🔧 [2/3] Gerando medium.glb (50% triângulos)..."

# Passo 1: Simplificar a partir do ORIGINAL (não do high comprimido)
npx @gltf-transform/cli weld "$INPUT" "$OUTPUT_DIR/medium-temp.glb"
npx @gltf-transform/cli simplify "$OUTPUT_DIR/medium-temp.glb" "$OUTPUT_DIR/medium-temp2.glb" \
  --ratio 0.5 \
  --error 0.001

# Passo 2: Recomprimir com Draco
npx @gltf-transform/cli optimize "$OUTPUT_DIR/medium-temp2.glb" "$OUTPUT_DIR/medium.glb" \
  --compress draco

# Limpar temporários
rm -f "$OUTPUT_DIR/medium-temp.glb" "$OUTPUT_DIR/medium-temp2.glb"

MEDIUM_SIZE=$(du -h "$OUTPUT_DIR/medium.glb" | cut -f1)
echo "✅ medium.glb criado ($MEDIUM_SIZE)"
echo ""

# =============================================================================
# Fase 3: Gerar LOW.glb (10% triângulos + recomprimir - placeholder rápido)
# =============================================================================
echo "🔧 [3/3] Gerando low.glb (10% triângulos - placeholder)..."

# Passo 1: Simplificar agressivamente
npx @gltf-transform/cli weld "$INPUT" "$OUTPUT_DIR/low-temp.glb"
npx @gltf-transform/cli simplify "$OUTPUT_DIR/low-temp.glb" "$OUTPUT_DIR/low-temp2.glb" \
  --ratio 0.1 \
  --error 0.01

# Passo 2: Recomprimir com Draco
npx @gltf-transform/cli optimize "$OUTPUT_DIR/low-temp2.glb" "$OUTPUT_DIR/low.glb" \
  --compress draco

# Limpar temporários
rm -f "$OUTPUT_DIR/low-temp.glb" "$OUTPUT_DIR/low-temp2.glb"

LOW_SIZE=$(du -h "$OUTPUT_DIR/low.glb" | cut -f1)
echo "✅ low.glb criado ($LOW_SIZE)"
echo ""

# =============================================================================
# Resumo
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMO DE OTIMIZAÇÃO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Original:  $ORIGINAL_SIZE"
echo "High:      $HIGH_SIZE (qualidade máxima comprimida)"
echo "Medium:    $MEDIUM_SIZE (50% triângulos)"
echo "Low:       $LOW_SIZE (placeholder rápido)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 LOD gerado com sucesso!"
