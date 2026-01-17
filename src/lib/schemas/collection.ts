import { z } from 'zod';

export const createCollectionSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  description: z.string().optional(),
});

export const updateCollectionSchema = createCollectionSchema.extend({
  id: z.uuid(),
});

export const deleteCollectionSchema = z.object({
  id: z.uuid(),
});

export type CreateCollectionSchema = typeof createCollectionSchema;
export type UpdateCollectionSchema = typeof updateCollectionSchema;
export type DeleteCollectionSchema = typeof deleteCollectionSchema;
