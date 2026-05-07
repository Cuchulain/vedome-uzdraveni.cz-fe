import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const testimonials = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    author: z.string(),
    location: z.string().optional(),
    excerpt: z.string().optional(),
    order: z.number().optional().default(99),
    rating: z.number().min(1).max(5).optional(),
    date: z.coerce.date().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, testimonials };
