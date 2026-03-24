import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');
  const siteUrl = site?.toString() || 'https://zacculpan.com';

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zac Culpan</title>
    <description>Writing about ecosystem marketing, creator marketing, and SaaS growth.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-nz</language>
    <lastBuildDate>${sortedPosts[0]?.data.pubDate.toUTCString()}</lastBuildDate>
${sortedPosts
  .map(
    (post) => `    <item>
      <title>${post.data.title}</title>
      <description>${post.data.description}</description>
      <link>${siteUrl}blog/${post.id}</link>
      <guid isPermaLink="true">${siteUrl}blog/${post.id}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
