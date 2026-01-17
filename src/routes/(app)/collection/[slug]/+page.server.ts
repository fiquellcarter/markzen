import { error, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { auth } from '$lib/auth/server';
import { deleteCollectionSchema, updateCollectionSchema } from '$lib/schemas/collection';
import { db } from '$lib/server/db';
import { collection } from '$lib/server/db/schema';

export async function load({ params, request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return redirect(302, '/sign-in');
  }

  const [existingCollection] = await db
    .select()
    .from(collection)
    .where(and(eq(collection.userId, session.user.id), eq(collection.slug, params.slug)));

  if (!existingCollection) {
    return error(404, 'Collection not found');
  }

  const [updateCollectionForm, deleteCollectionForm] = await Promise.all([
    superValidate(
      {
        id: existingCollection.id,
        name: existingCollection.name,
        description: existingCollection.description || undefined,
      },
      zod4(updateCollectionSchema)
    ),
    superValidate({ id: existingCollection.id }, zod4(deleteCollectionSchema)),
  ]);

  return {
    collection: existingCollection,
    updateCollectionForm,
    deleteCollectionForm,
  };
}
