import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { updateProfileSchema } from '$lib/schemas/profile';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

export async function load({ parent }) {
  const parentData = await parent();

  return {
    form: await superValidate(parentData.session.user, zod4(updateProfileSchema)),
  };
}

export const actions: Actions = {
  async default({ request, locals, cookies }) {
    const form = await superValidate(request, zod4(updateProfileSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    await db
      .update(user)
      .set({
        name: form.data.name,
      })
      .where(eq(user.id, locals.user.id));

    setFlash(
      {
        type: 'success',
        message: 'Name updated successfully',
      },
      cookies
    );
  },
};
