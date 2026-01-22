import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { deleteBookmarkSchema } from '$lib/schemas/bookmark';
import { db } from '$lib/server/db';
import { bookmark } from '$lib/server/db/schema';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

export async function load() {
  return {
    form: await superValidate(zod4(deleteBookmarkSchema)),
  };
}

export const actions: Actions = {
  async default({ request, locals, cookies }) {
    const form = await superValidate(request, zod4(deleteBookmarkSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    const [existingBookmark] = await db
      .select()
      .from(bookmark)
      .where(and(eq(bookmark.userId, locals.user.id), eq(bookmark.id, form.data.id)));

    if (!existingBookmark) {
      setFlash(
        {
          type: 'error',
          message: 'Bookmark not found',
        },
        cookies
      );

      return;
    }

    await db.delete(bookmark).where(eq(bookmark.id, form.data.id));

    setFlash(
      {
        type: 'success',
        message: 'Bookmark deleted successfully',
      },
      cookies
    );
  },
};
