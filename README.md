# Plann3d

Site institucional da Plann3d - estúdio de visualização arquitetônica e renderização 3D de alta qualidade.

## 🚀 Sobre o Projeto

O Plann3d é um website moderno e responsivo que apresenta o portfólio de projetos de renderização arquitetônica, serviços oferecidos e informações sobre o estúdio. O site oferece uma experiência imersiva com animações suaves, suporte multilíngue, temas claro/escuro e **visualizador 3D interativo**.

### ✨ Principais Funcionalidades

- 🌐 **Internacionalização (i18n)**: Suporte para Português, Inglês e Espanhol
- 🎨 **Temas**: Modo claro, escuro e automático (baseado no sistema)
- 📱 **Design Responsivo**: Layout otimizado para todos os dispositivos
- 🎬 **Galeria de Mídia**: Visualização de imagens e vídeos dos projetos
- 🎯 **Animações**: Transições suaves com Framer Motion
- 📋 **Formulários**: Sistema de contato com validação
- ♿ **Acessibilidade**: Componentes acessíveis com Radix UI
- 🔍 **SEO Otimizado**: Meta tags, Schema.org e sitemap
- 🏗️ **Visualizador 3D**: Modelos interativos com React Three Fiber
- ⚡ **Sistema LOD**: Carregamento progressivo para performance otimizada

### 📄 Páginas

- **Home** (`/`): Hero section, projetos em destaque, serviços e informações do estúdio
- **Projetos** (`/projects`): Listagem completa do portfólio
- **Detalhes do Projeto** (`/projects/:projectId`): Informações detalhadas de cada projeto
- **Visualizador 3D** (`/projects/:projectId/viewer`): Modelo 3D interativo do projeto
- **Ferramentas** (`/tools`): Tecnologias e ferramentas utilizadas
- **FAQ** (`/faq`): Perguntas frequentes
- **Contato** (`/contact`): Formulário de contato

## 🏗️ Visualizador 3D

O site conta com um visualizador 3D completo para projetos arquitetônicos:

### Funcionalidades

- **Orbit Controls**: Rotação, zoom e pan do modelo
- **Auto Rotate**: Rotação automática para exibição
- **Auto Tour**: Tour cinematográfico pelos ângulos do projeto
- **Camera Presets**: Vistas predefinidas (frontal, traseira, laterais, superior, perspectiva)
- **Camadas**: Filtrar visualização por estrutura, mobiliário, vegetação e iluminação
- **Especificações**: Painel com metadados do modelo (triângulos, vértices, dimensões)
- **Zoom Slider**: Controle preciso do nível de zoom
- **Quality Selector**: Escolha da qualidade do modelo (Baixa, Média, Alta)

### Sistema LOD (Level of Detail)

Implementação de carregamento progressivo para otimização de performance:

```
Original (80-153MB) → High (13-19MB) → Medium (13-19MB) → Low (12-18MB)
Redução média: ~85%
```

#### Geração de LOD

```bash
# Gerar versões LOD de um modelo
./scripts/generate-lod.sh <input.glb> <output-dir>

# Exemplo
./scripts/generate-lod.sh public/models/arena-bsb/model.glb public/models/arena-bsb
```

O script utiliza `gltf-transform` para:

- Compressão Draco
- Simplificação de malhas
- Otimização de texturas
- Deduplicação de dados

## 🛠️ Tecnologias

### Core

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TanStack Router** - Roteamento file-based com SSR

### UI & Styling

- **Tailwind CSS 4** - Framework de estilos utilitários
- **Shadcn/ui** - Componentes UI acessíveis
- **Radix UI** - Primitivos de componentes headless
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones

### 3D & WebGL

- **React Three Fiber** - React renderer para Three.js
- **@react-three/drei** - Helpers e abstrações para R3F
- **Three.js** - Biblioteca 3D WebGL
- **gltf-transform** - Otimização de modelos GLTF/GLB

### Internacionalização

- **i18next** - Framework de i18n
- **react-i18next** - Integração React
- **i18next-browser-languagedetector** - Detecção automática de idioma

### Formulários & Validação

- **React Hook Form** - Gerenciamento de formulários
- **Hookform Resolvers** - Validação de schemas

### Outras

- **next-themes** - Gerenciamento de temas
- **sonner** - Sistema de notificações toast
- **class-variance-authority** - Variantes de componentes
- **clsx / tailwind-merge** - Utilitários para classes CSS

## 📦 Instalação

```bash
# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento (porta 3000)
yarn dev

# Build para produção
yarn build

# Preview da build de produção
yarn preview
```

## 🧪 Testes

```bash
# Executar testes
yarn test
```

Este projeto usa [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/).

## 🎨 Estilização

### Tailwind CSS

O projeto utiliza Tailwind CSS 4 com suporte a variáveis CSS nativas. Os estilos globais estão em `src/styles.css`.

### Shadcn/ui

Adicionar novos componentes:

```bash
pnpm dlx shadcn@latest add [component-name]
```

### Temas

O sistema de temas é gerenciado pelo `next-themes` e integrado ao Tailwind CSS:

- Light (Claro)
- Dark (Escuro)
- System (Sistema)

## 🗺️ Roteamento

O projeto usa **TanStack Router** com roteamento baseado em arquivos. As rotas estão localizadas em `src/routes/`.

### Estrutura de Rotas

```
src/routes/
├── __root.tsx              # Layout raiz (header, footer, providers)
├── index.tsx               # Página inicial (/)
├── contact.tsx             # Página de contato (/contact)
├── faq.tsx                 # FAQ (/faq)
├── tools.tsx               # Ferramentas (/tools)
└── projects/
    ├── index.tsx           # Lista de projetos (/projects)
    ├── $projectId_.tsx     # Detalhes do projeto (/projects/:projectId)
    └── $projectId_.viewer.tsx  # Visualizador 3D (/projects/:projectId/viewer)
```

## 🌍 Internacionalização

O projeto suporta múltiplos idiomas usando i18next. Os arquivos de tradução estão em `src/i18n/locales/`.

### Idiomas Suportados

- Português (pt)
- Inglês (en)
- Espanhol (es)

### Usar Traduções

```tsx
import { useTranslation } from 'react-i18next'

function Component() {
  const { t } = useTranslation()

  return <h1>{t('hero.headline1')}</h1>
}
```

## 🔧 Scripts Disponíveis

```bash
yarn dev              # Servidor de desenvolvimento (porta 3000)
yarn build            # Build de produção
yarn preview          # Preview da build
yarn test             # Executar testes
yarn lint             # Verificar lint
yarn lint:fix         # Corrigir problemas de lint
yarn format           # Formatar código com Prettier
yarn format:check     # Verificar formatação
yarn check            # Formatar e corrigir lint
yarn knip:check       # Verificar dependências não utilizadas
```

## 📁 Estrutura do Projeto

```
plann3d/
├── public/
│   ├── models/              # Modelos 3D (.glb)
│   │   ├── arena-bsb/       # Projeto Arena BSB
│   │   │   ├── high.glb     # Alta qualidade
│   │   │   ├── medium.glb   # Média qualidade
│   │   │   └── low.glb      # Baixa qualidade (placeholder)
│   │   └── ...
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-lod.sh      # Script para gerar versões LOD
├── src/
│   ├── assets/              # Imagens, vídeos, etc.
│   ├── components/
│   │   ├── ui/              # Componentes UI (Shadcn)
│   │   ├── home/            # Componentes da home
│   │   └── viewer-3d/       # Componentes do visualizador 3D
│   │       ├── model.tsx           # Componente de modelo
│   │       ├── model-viewer.tsx    # Viewer principal
│   │       ├── lod-model.tsx       # LOD com carregamento progressivo
│   │       ├── specifications-panel.tsx  # Painel de especificações
│   │       ├── zoom-slider.tsx     # Controle de zoom
│   │       └── quality-selector.tsx # Seletor de qualidade
│   ├── constants/           # Constantes da aplicação
│   ├── data/                # Dados estáticos (projetos, FAQ)
│   ├── hooks/
│   │   └── useProgressiveModel.ts  # Hook para carregamento LOD
│   ├── i18n/
│   │   └── locales/         # Arquivos de tradução (pt, en, es)
│   ├── lib/                 # Utilitários e helpers
│   ├── routes/              # Rotas da aplicação
│   ├── types/               # Definições TypeScript
│   ├── router.tsx           # Configuração do router
│   └── styles.css           # Estilos globais
├── components.json          # Configuração Shadcn
├── eslint.config.js         # Configuração ESLint
├── prettier.config.js       # Configuração Prettier
├── tailwind.config.js       # Configuração Tailwind
├── tsconfig.json            # Configuração TypeScript
├── vercel.json              # Configuração Vercel (cache headers)
└── vite.config.ts           # Configuração Vite
```

## 🔍 SEO

O projeto inclui otimizações de SEO:

- Meta tags (Open Graph, Twitter Cards)
- Schema.org markup (Organization, LocalBusiness, WebSite)
- Sitemap XML
- Robots.txt
- Canonical URLs
- Suporte a múltiplos idiomas (hreflang)

## ⚡ Performance

### Otimizações de Modelos 3D

- **Compressão Draco**: Redução significativa do tamanho dos arquivos
- **Sistema LOD**: Carregamento progressivo (low → medium → high)
- **Cache HTTP**: Headers configurados para cache de 1 ano em `.glb`
- **Preload Assíncrono**: Modelos de maior qualidade carregados em background

### Métricas de Otimização

| Projeto      | Original | Otimizado | Redução |
| ------------ | -------- | --------- | ------- |
| Arena BSB    | 80MB     | 12-13MB   | ~85%    |
| Area Gourmet | 29MB     | 5MB       | ~82%    |

## 📝 Linting & Formatação

O projeto usa:

- **ESLint** com configuração do TanStack
- **Prettier** para formatação de código
- **Husky** para Git hooks
- **Lint-staged** para validação pre-commit

## 🤝 Contribuindo

1. Siga as convenções de código (ESLint + Prettier)
2. Mantenha as traduções atualizadas em todos os idiomas
3. Teste em diferentes dispositivos e navegadores
4. Execute `yarn check` antes de fazer commit
5. Para modelos 3D, gere as versões LOD usando o script

## 📄 Licença

Este projeto é privado e proprietário.
