/**
 * Dynamic Sitemap Generator
 *
 * This module generates a sitemap.xml dynamically based on:
 * - Static routes (defined in this file)
 * - Dynamic project routes (from projects registry)
 *
 * For SSG/SSR, this can be called at build time to generate the sitemap file.
 */

import { getProjects } from '@/data/projects'

const BASE_URL = 'https://plann3d.com.br'

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/projects', priority: 0.9, changefreq: 'weekly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/tools', priority: 0.7, changefreq: 'monthly' },
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },
]

interface SitemapEntry {
  loc: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

/**
 * Generate sitemap entries for all pages
 */
export function generateSitemapEntries(): Array<SitemapEntry> {
  const today = new Date().toISOString().split('T')[0]
  const entries: Array<SitemapEntry> = []

  // Add static pages
  for (const page of STATIC_PAGES) {
    entries.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq as SitemapEntry['changefreq'],
      priority: page.priority,
    })
  }

  // Add dynamic project pages
  const projects = getProjects('pt')
  for (const project of projects) {
    entries.push({
      loc: `${BASE_URL}/projects/${project.id}`,
      lastmod: project.specs?.year ? `${project.specs.year}-01-01` : today,
      changefreq: 'monthly',
      priority: 0.8,
    })
  }

  return entries
}

/**
 * Generate XML sitemap string
 */
export function generateSitemapXML(): string {
  const entries = generateSitemapEntries()

  const urlElements = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  return `# Plann3d - Visualização Arquitetônica 3D
# https://plann3d.com.br

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Disallow admin/api routes
Disallow: /api/
Disallow: /_/

# Crawl delay for polite crawling
Crawl-delay: 1
`
}
