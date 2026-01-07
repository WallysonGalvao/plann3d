Assim como temos a tela /Users/wallysongalvao/Documents/workspace/plann3d/src/routes/projects/$projectId\_.viewer.tsx para visualizacao de arquivos 3D para formato .glb, precisamos implementar a tela de visualizacao para formato .ifc, seguindo os requisitos abaixo:

# 🧭 Roadmap Técnico — BIM Viewer IFC + PDF (Web)

## 🟢 FASE 0 — Decisões base (fundação do projeto)

📌 **Objetivo:** não errar no começo

### Stack recomendada

- **Frontend**: React + TypeScript
- **3D / BIM**:
  - three.js
  - IFC.js (`web-ifc`)

- **2D / PDF**:
  - PDF.js

- **Estado global**:
  - Zustand ou Redux Toolkit

- **UI**:
  - Tailwind ou CSS Modules

- **Build**:
  - Vite

📦 Resultado:

> Estrutura sólida para crescer (produto, não demo)

---

## 🟢 FASE 1 — Viewer IFC funcional (core 3D)

📌 **Objetivo:** visualizar, navegar e selecionar o modelo

### Implementações

- Carregar `.ifc`
- Renderizar com Three.js
- Orbit / Pan / Zoom
- Seleção de elementos
- Destaque (highlight / selection)
- Clipping plane manual

### IFC.js

- `IFCLoader`
- `IFCManager`
- `Selector`
- `ClippingPlanes`

📦 Entregável:
✔ Viewer 3D com seleção e corte manual

---

## 🟢 FASE 2 — Viewer PDF profissional (core 2D)

📌 **Objetivo:** PDF deixa de ser “download”

### Implementações

- Renderização com PDF.js (canvas)
- Zoom + pan
- Navegação por página
- Overlay HTML/CSS
- Hotspots manuais (DET., cortes)

📦 Entregável:
✔ PDF técnico navegável e interativo

---

## 🟢 FASE 3 — Layout Split 2D ↔ 3D

📌 **Objetivo:** exatamente a tela que você mostrou

### Layout

- Grid 2 colunas:
  - Esquerda: PDF
  - Direita: 3D

- Toolbar superior
- Painel de propriedades lateral
- Barra inferior de vistas

### Técnicas

- ResizeObserver
- Canvas responsivo
- UI desacoplada do viewer

📦 Entregável:
✔ Tela BIM split funcional

---

## 🟢 FASE 4 — Sincronização 2D ⇄ 3D (alma do produto)

📌 **Objetivo:** BIM de verdade

### Criar sistema de **views**

```ts
interface ViewConfig {
  id: string
  camera: { position: number[]; target: number[] }
  clipping?: { normal: number[]; constant: number }
  ifcTypes?: number[]
}
```

### Funcionalidades

- Clique no PDF → ativa view 3D
- Botões de:
  - Planta
  - Corte A-A
  - Corte B-B
  - Isométrica

- “Sincronizar vistas”

📦 Entregável:
✔ Corte no desenho = corte no modelo

---

## 🟢 FASE 5 — Propriedades BIM

📌 **Objetivo:** engenharia, não só visual

### Implementações

- Clique no elemento 3D
- Ler propriedades IFC
- Mostrar:
  - Tipo
  - Dimensões
  - Peso
  - Material

- Link para:
  - detalhe no PDF

📦 Entregável:
✔ Painel de propriedades como o da imagem

---

## 🟢 FASE 6 — Filtros e isolamento

📌 **Objetivo:** clareza visual

### Filtros

- Estrutura
- Degraus
- Guarda-corpos

### Técnicas

- `IfcType` filtering
- Visibility toggles
- Opacity control

📦 Entregável:
✔ Controle total da cena

---

## 🟢 FASE 7 — UX refinado (nível produto)

📌 **Objetivo:** profissionalismo

### Melhorias

- Transições de câmera suaves
- Feedback visual 2D ↔ 3D
- Estados de loading
- Skeleton UI
- Undo/Reset view

📦 Entregável:
✔ Experiência fluida

---

## 🟢 FASE 8 — Performance e produção

📌 **Objetivo:** rodar bem em obra e escritório

### Performance

- Cache do IFC (IndexedDB)
- DRACO / simplificação
- Lazy loading de PDFs
- Web Workers

### Produção

- Build otimizado
- CDN para arquivos
- Versionamento de projetos

📦 Entregável:
✔ App pronto para escala

---

## 🟢 FASE 9 — Evoluções futuras (opcional)

- Exploded view
- Quantitativos
- Comparação de versões
- Anotações e comentários
- Modo apresentação

---

# 🧠 Visão geral simplificada

```
FASE 1–3 → Viewer funcional
FASE 4–5 → BIM de verdade
FASE 6–7 → Produto profissional
FASE 8 → Escala
```
