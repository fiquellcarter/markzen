import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { deleteCollectionSchema } from '$lib/schemas/collection';
import { db } from '$lib/server/db';
import { collection } from '$lib/server/db/schema';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

export async function load() {
  return {
    form: await superValidate(zod4(deleteCollectionSchema)),
  };
}

export const actions: Actions = {
  async default({ request, locals, cookies }) {
    const form = await superValidate(request, zod4(deleteCollectionSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    const [existingCollection] = await db
      .select()
      .from(collection)
      .where(and(eq(collection.userId, locals.user.id), eq(collection.id, form.data.id)));

    if (!existingCollection) {
      return setFlash({ type: 'error', message: 'Collection not found' }, cookies);
    }

    await db.delete(collection).where(eq(collection.id, form.data.id));

    redirect(
      '/dashboard',
      { type: 'success', message: 'Collection deleted successfully' },
      cookies
    );
  },
};
