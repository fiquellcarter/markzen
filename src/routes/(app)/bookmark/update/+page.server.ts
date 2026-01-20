import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { updateBookmarkSchema } from '$lib/schemas/bookmark';
import { db } from '$lib/server/db';
import { bookmark } from '$lib/server/db/schema';
import { extractMetadata } from '$lib/server/metadata';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

export async function load() {
  return { form: await superValidate(zod4(updateBookmarkSchema)) };
}

export const actions: Actions = {
  async default({ request, locals, cookies }) {
    const form = await superValidate(request, zod4(updateBookmarkSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    const [existingBookmark] = await db
      .select()
      .from(bookmark)
      .where(and(eq(bookmark.userId, locals.user.id), eq(bookmark.id, form.data.id)));

    if (!existingBookmark) {
      return setFlash({ type: 'error', message: 'Bookmark not found' }, cookies);
    }

    const metadata = await extractMetadata(form.data.url);

    await db
      .update(bookmark)
      .set({
        collectionId: form.data.collectionId,
        url: form.data.url,
        title: form.data.title,
        description: form.data.description,
        favicon: metadata.favicon,
      })
      .where(eq(bookmark.id, form.data.id));

    setFlash({ type: 'success', message: 'Bookmark updated successfully' }, cookies);
  },
};
