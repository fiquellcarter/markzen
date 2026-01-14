import { z } from 'zod';

export const createCollectionSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  description: z.string().optional(),
});

export type CreateCollectionSchema = typeof createCollectionSchema;
