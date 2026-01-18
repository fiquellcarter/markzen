import { z } from 'zod';

export const createBookmarkSchema = z.object({
  url: z.url().trim(),
  collectionId: z
    .uuid()
    .nullish()
    .or(z.literal(''))
    .transform((val) => (val === '' ? null : val)),
});

export type CreateBookmarkSchema = typeof createBookmarkSchema;
