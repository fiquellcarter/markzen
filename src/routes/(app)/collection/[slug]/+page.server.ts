import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { kebabCase } from 'string-ts';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { deleteBookmarkSchema, updateBookmarkSchema } from '$lib/schemas/bookmark';
import { deleteCollectionSchema, updateCollectionSchema } from '$lib/schemas/collection';
import { db } from '$lib/server/db';
import { collection } from '$lib/server/db/schema';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

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
          ...existingCollection,
          description: existingCollection.description || undefined,
        },
        zod4(updateCollectionSchema)
      ),
      superValidate(existingCollection, zod4(deleteCollectionSchema)),
      superValidate(zod4(updateBookmarkSchema)),
      superValidate(zod4(deleteBookmarkSchema)),
    ]);

  return {
    collection: existingCollection,
    updateCollectionForm,
    deleteCollectionForm,
    updateBookmarkForm,
    deleteBookmarkForm,
  };
}

export const actions: Actions = {
  async update({ request, cookies }) {
    const form = await superValidate(request, zod4(updateCollectionSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    const slug = kebabCase(form.data.name);

    await db
      .update(collection)
      .set({
        name: form.data.name,
        description: form.data.description || null,
        slug,
      })
      .where(eq(collection.id, form.data.id));

    redirect(
      `/collection/${slug}`,
      {
        type: 'success',
        message: 'Collection updated successfully',
      },
      cookies
    );
  },

  async delete({ request, cookies }) {
    const form = await superValidate(request, zod4(deleteCollectionSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    await db.delete(collection).where(eq(collection.id, form.data.id));

    redirect(
      '/dashboard',
      {
        type: 'success',
        message: 'Collection deleted successfully',
      },
      cookies
    );
  },
};
