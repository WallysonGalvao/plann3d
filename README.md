# Plann3d

Site institucional da Plann3d - estúdio de visualização arquitetônica e renderização 3D de alta qualidade.

## 🚀 Sobre o Projeto

O Plann3d é um website moderno e responsivo que apresenta o portfólio de projetos de renderização arquitetônica, serviços oferecidos e informações sobre o estúdio. O site oferece uma experiência imersiva com animações suaves, suporte multilíngue e temas claro/escuro.

### ✨ Principais Funcionalidades

- 🌐 **Internacionalização (i18n)**: Suporte para Português e Inglês
- 🎨 **Temas**: Modo claro, escuro e automático (baseado no sistema)
- 📱 **Design Responsivo**: Layout otimizado para todos os dispositivos
- 🎬 **Galeria de Mídia**: Visualização de imagens e vídeos dos projetos
- 🎯 **Animações**: Transições suaves com Framer Motion
- 📋 **Formulários**: Sistema de contato com validação
- ♿ **Acessibilidade**: Componentes acessíveis com Radix UI
- 🔍 **SEO Otimizado**: Meta tags, Schema.org e sitemap

### 📄 Páginas

- **Home** (`/`): Hero section, projetos em destaque, serviços e informações do estúdio
- **Projetos** (`/projects`): Listagem completa do portfólio
- **Detalhes do Projeto** (`/projects/:projectId`): Informações detalhadas de cada projeto
- **Ferramentas** (`/tools`): Tecnologias e ferramentas utilizadas
- **FAQ** (`/faq`): Perguntas frequentes
- **Contato** (`/contact`): Formulário de contato

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
npm install

# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 🧪 Testes

```bash
# Executar testes
npm run test
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

Exemplo:

```bash
pnpm dlx shadcn@latest add dialog
```

### Temas

O sistema de temas é gerenciado pelo `next-themes` e integrado ao Tailwind CSS. Os temas disponíveis são:

- Light (Claro)
- Dark (Escuro)
- System (Sistema)

## 🗺️ Roteamento

O projeto usa **TanStack Router** com roteamento baseado em arquivos. As rotas estão localizadas em `src/routes/`.

### Estrutura de Rotas

```
src/routes/
├── __root.tsx          # Layout raiz (header, footer, providers)
├── index.tsx           # Página inicial (/)
├── contact.tsx         # Página de contato (/contact)
├── faq.tsx             # FAQ (/faq)
├── tools.tsx           # Ferramentas (/tools)
└── projects/
    ├── index.tsx       # Lista de projetos (/projects)
    └── $projectId.tsx  # Detalhes do projeto (/projects/:projectId)
```

### Adicionar Nova Rota

1. Crie um novo arquivo em `src/routes/`
2. O TanStack Router gerará automaticamente a rota
3. Use o componente `Link` para navegação:

```tsx
import { Link } from '@tanstack/react-router'

;<Link to="/nova-rota">Nova Rota</Link>
```

## 🌍 Internacionalização

O projeto suporta múltiplos idiomas usando i18next. Os arquivos de tradução estão em `src/i18n/locales/`.

### Idiomas Suportados

- Português (pt)
- Inglês (en)

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
npm run dev              # Servidor de desenvolvimento (porta 3000)
npm run build            # Build de produção
npm run preview          # Preview da build
npm run test             # Executar testes
npm run lint             # Verificar lint
npm run lint:fix         # Corrigir problemas de lint
npm run format           # Formatar código com Prettier
npm run format:check     # Verificar formatação
npm run check            # Formatar e corrigir lint
npm run knip:check       # Verificar dependências não utilizadas
```

## 📁 Estrutura do Projeto

```
plann3d/
├── public/              # Arquivos estáticos
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/          # Imagens, vídeos, etc.
│   ├── components/      # Componentes React
│   │   ├── ui/          # Componentes UI (Shadcn)
│   │   └── home/        # Componentes específicos da home
│   ├── constants/       # Constantes da aplicação
│   ├── data/            # Dados estáticos (projetos, FAQ, etc.)
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # Configuração de internacionalização
│   │   └── locales/     # Arquivos de tradução
│   ├── lib/             # Utilitários e helpers
│   ├── routes/          # Rotas da aplicação
│   ├── types/           # Definições TypeScript
│   ├── router.tsx       # Configuração do router
│   └── styles.css       # Estilos globais
├── components.json      # Configuração Shadcn
├── eslint.config.js     # Configuração ESLint
├── prettier.config.js   # Configuração Prettier
├── tailwind.config.js   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── vite.config.ts       # Configuração Vite
```

## 🔍 SEO

O projeto inclui otimizações de SEO:

- Meta tags (Open Graph, Twitter Cards)
- Schema.org markup (Organization, LocalBusiness, WebSite)
- Sitemap XML
- Robots.txt
- Canonical URLs
- Suporte a múltiplos idiomas (hreflang)

## 📝 Linting & Formatação

O projeto usa:

- **ESLint** com configuração do TanStack
- **Prettier** para formatação de código
- **Husky** para Git hooks
- **Lint-staged** para validação pre-commit

A formatação é aplicada automaticamente em commits através do lint-staged.

## 🤝 Contribuindo

1. Siga as convenções de código (ESLint + Prettier)
2. Mantenha as traduções atualizadas em ambos os idiomas
3. Teste em diferentes dispositivos e navegadores
4. Execute `npm run check` antes de fazer commit

## 📄 Licença

Este projeto é privado e proprietário.
