import rehypeSlug from 'rehype-slug';
import { rehypePrettyCode } from 'rehype-pretty-code';
import { defineCollection, defineConfig, defineSchema, s } from 'velite';

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
  collections: { about },
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'github-dark' }]],
  },
});
