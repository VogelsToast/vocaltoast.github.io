import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');
  const siteUrl = site?.toString() || 'https://zacculpan.com';

  const urls = [
    // Static pages
    { loc: siteUrl, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}blog`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${siteUrl}about`, changefreq: 'monthly', priority: '0.7' },
    // Blog posts
    ...posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map(post => ({
        loc: `${siteUrl}blog/${post.id}`,
        lastmod: post.data.pubDate.toISOString().split('T')[0],
        changefreq: 'monthly' as const,
        priority: '0.8',
      })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
