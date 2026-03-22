import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderPostOg } from '../../lib/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      description: post.data.description,
      tag: post.data.tags?.[0],
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, tag } = props as {
    title: string;
    description: string;
    tag?: string;
  };
  const png = await renderPostOg(title, description, tag);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
