import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    lang: z.enum(['es', 'en']).default('es'),
  }),
});

export const collections = {
  'blog': blogCollection,
};
