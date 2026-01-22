import { fail } from '@sveltejs/kit';
import { kebabCase } from 'string-ts';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { createCollectionSchema } from '$lib/schemas/collection';
import { db } from '$lib/server/db';
import { collection } from '$lib/server/db/schema';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

export async function load() {
  return {
    form: await superValidate(zod4(createCollectionSchema)),
  };
}

export const actions: Actions = {
  async default({ request, locals, cookies }) {
    const form = await superValidate(request, zod4(createCollectionSchema));

    await delay();

    if (!form.valid) {
      return fail(400, { form });
    }

    const slug = kebabCase(form.data.name);

    await db.insert(collection).values({
      userId: locals.user.id,
      name: form.data.name,
      description: form.data.description,
      slug,
    });

    redirect(
      `/collection/${slug}`,
      {
        type: 'success',
        message: 'Collection created successfully',
      },
      cookies
    );
  },
};
