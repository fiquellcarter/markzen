import { fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { createBookmarkSchema } from '$lib/schemas/bookmark';
import { db } from '$lib/server/db';
import { bookmark } from '$lib/server/db/schema';
import { extractMetadata } from '$lib/server/metadata';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

export async function load() {
  return {
    form: await superValidate(zod4(createBookmarkSchema)),
  };
}

export const actions: Actions = {
  async default({ request, locals, cookies }) {
    const form = await superValidate(request, zod4(createBookmarkSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    const metadata = await extractMetadata(form.data.url);

    await db.insert(bookmark).values({
      userId: locals.user.id,
      collectionId: form.data.collectionId,
      url: form.data.url,
      title: metadata.title,
      description: metadata.description,
      favicon: metadata.favicon,
    });

    setFlash({ type: 'success', message: 'Bookmark created successfully' }, cookies);
  },
};
