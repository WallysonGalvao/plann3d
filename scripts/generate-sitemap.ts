#!/usr/bin/env node
/**
 * Build script to generate sitemap.xml and robots.txt
 *
 * Run after build: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const BASE_URL = 'https://plann3d.com.br'

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/projects', priority: 0.9, changefreq: 'weekly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/tools', priority: 0.7, changefreq: 'monthly' },
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },
]

// Project IDs (add new projects here)
const PROJECT_IDS = ['torre-de-tv', 'residencia-alphaville', 'hotel-copacabana']

interface SitemapEntry {
  loc: string
  lastmod: string
  changefreq: string
  priority: number
}

function generateSitemapEntries(): Array<SitemapEntry> {
  const today = new Date().toISOString().split('T')[0]
  const entries: Array<SitemapEntry> = []

  // Add static pages
  for (const page of STATIC_PAGES) {
    entries.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    })
  }

  // Add dynamic project pages
  for (const projectId of PROJECT_IDS) {
    entries.push({
      loc: `${BASE_URL}/projects/${projectId}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    })
  }

  return entries
}

function generateSitemapXML(): string {
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

function generateRobotsTxt(): string {
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

// Main execution
const publicDir = join(process.cwd(), 'public')
const distClientDir = join(process.cwd(), 'dist', 'client')

// Ensure directories exist
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true })
}

// Generate and write sitemap
const sitemapXML = generateSitemapXML()
const robotsTxt = generateRobotsTxt()

// Write to public (for dev) and dist/client (for prod)
writeFileSync(join(publicDir, 'sitemap.xml'), sitemapXML)
writeFileSync(join(publicDir, 'robots.txt'), robotsTxt)
console.log('✅ Generated sitemap.xml and robots.txt in public/')

// Also write to dist/client if it exists (post-build)
if (existsSync(distClientDir)) {
  writeFileSync(join(distClientDir, 'sitemap.xml'), sitemapXML)
  writeFileSync(join(distClientDir, 'robots.txt'), robotsTxt)
  console.log('✅ Copied to dist/client/')
}

console.log(`📍 Sitemap entries: ${generateSitemapEntries().length}`)
