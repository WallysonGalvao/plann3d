import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { NotFoundPage } from '../components/not-found-page'
import { ThemeProvider } from '../components/theme-provider'
import { DEFAULT_SEO, LOCAL_BUSINESS_SCHEMA, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from '../lib/seo'
import appCss from '../styles.css?url'
import '../i18n'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: DEFAULT_SEO.title },
      { name: 'description', content: DEFAULT_SEO.description },
      { name: 'theme-color', content: '#09090b' },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: DEFAULT_SEO.url },
      { property: 'og:title', content: DEFAULT_SEO.title },
      { property: 'og:description', content: DEFAULT_SEO.description },
      { property: 'og:image', content: DEFAULT_SEO.image },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:locale:alternate', content: 'en_US' },
      { property: 'og:site_name', content: 'Plann3d' },

      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: DEFAULT_SEO.title },
      { name: 'twitter:description', content: DEFAULT_SEO.description },
      { name: 'twitter:image', content: DEFAULT_SEO.image },

      // Robots
      { name: 'robots', content: 'index, follow' },

      // Author/Publisher
      { name: 'author', content: 'Plann3d' },
    ],
    links: [
      // Preconnect to Google Fonts for faster font loading
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'canonical', href: DEFAULT_SEO.url },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'stylesheet', href: appCss },
      // Hreflang tags for international SEO
      { rel: 'alternate', hreflang: 'pt-BR', href: 'https://plann3d.com.br' },
      { rel: 'alternate', hreflang: 'en', href: 'https://plann3d.com.br' },
      { rel: 'alternate', hreflang: 'es', href: 'https://plann3d.com.br' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://plann3d.com.br' },
    ],
  }),

  // Custom 404 page
  notFoundComponent: NotFoundPage,

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Combine all JSON-LD schemas
  const jsonLdSchemas = [ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA]

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* JSON-LD Structured Data for SEO and AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchemas),
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
