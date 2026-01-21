import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { deleteBookmarkSchema, updateBookmarkSchema } from '$lib/schemas/bookmark';
import { deleteCollectionSchema, updateCollectionSchema } from '$lib/schemas/collection';
import { db } from '$lib/server/db';
import { collection } from '$lib/server/db/schema';

export async function load({ params, parent }) {
  const parentData = await parent();

  const [existingCollection] = await db
    .select()
    .from(collection)
    .where(
      and(eq(collection.userId, parentData.session.user.id), eq(collection.slug, params.slug))
    );

  if (!existingCollection) {
    return error(404, 'Collection not found');
  }

  const [updateCollectionForm, deleteCollectionForm, updateBookmarkForm, deleteBookmarkForm] =
    await Promise.all([
      superValidate(
        {
          id: existingCollection.id,
          name: existingCollection.name,
          description: existingCollection.description || undefined,
        },
        zod4(updateCollectionSchema)
      ),
      superValidate(
        {
          id: existingCollection.id,
        },
        zod4(deleteCollectionSchema)
      ),
      superValidate(zod4(updateBookmarkSchema)),
      superValidate(zod4(deleteBookmarkSchema)),
    ]);

  return {
    collection: existingCollection,
    collections: parentData.collections,
    bookmarks: parentData.bookmarks,
    updateCollectionForm,
    deleteCollectionForm,
    updateBookmarkForm,
    deleteBookmarkForm,
  };
}
