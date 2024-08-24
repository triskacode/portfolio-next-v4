import rehypeSlug from 'rehype-slug';
import { rehypePrettyCode } from 'rehype-pretty-code';
import { defineCollection, defineConfig, defineSchema, s } from 'velite';
import { remarkBlurNextImage } from './lib/remark/remark-blur-next-image';

const withSlugParams = <T extends { slug: string }>(
  data: T,
): T & {
  slugAsParams: string;
} => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
});

const meta = defineSchema(() =>
  s.object({
    title: s.string().optional(),
    description: s.string().optional(),
    keyword: s.array(s.string()).optional(),
  }),
);

const personalInfo = defineSchema(() =>
  s.object({
    name: s.string().max(30).optional(),
    email: s.string().optional(),
    phone: s.string().optional(),
    address: s.string().optional(),
    socials: s
      .array(
        s.object({
          name: s.string(),
          url: s.string(),
        }),
      )
      .optional(),
  }),
);

const about = defineCollection({
  name: 'About',
  pattern: 'about/index.mdx',
  single: true,
  schema: s.object({
    meta: meta(),
    personalInfo: personalInfo(),
    date: s.isodate(),
    updated: s.isodate().optional(),
    toc: s.toc(),
    content: s.mdx(),
  }),
});

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(100),
      slug: s.path(),
      description: s.string().max(250),
      date: s.isodate(),
      updated: s.isodate().optional(),
      authors: s.array(s.string()),
      cover: s.image(),
      published: s.boolean().optional().default(true),
      featured: s.boolean().optional().default(false),
      categories: s.array(s.string()),
      tags: s.array(s.string()),
      metadata: meta(),
      info: s.metadata(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(withSlugParams),
});

export default defineConfig({
  strict: process.env.NODE_ENV === 'production',
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:8].[ext]',
    clean: true,
  },
  collections: { about, posts },
  mdx: {
    remarkPlugins: [[remarkBlurNextImage]],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'github-dark' }]],
  },
});
