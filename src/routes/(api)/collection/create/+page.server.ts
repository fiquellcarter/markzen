import { fail } from '@sveltejs/kit';
import { kebabCase } from 'string-ts';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { createCollectionSchema } from '$lib/schemas/collection';
import { db } from '$lib/server/db';
import { collection } from '$lib/server/db/schema';
import { delay } from '$lib/utils';

import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod4(createCollectionSchema));

    if (!locals.user) {
      return message(form, {
        type: 'error',
        text: 'Unauthorized',
      });
    }

    await delay();

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      await db.insert(collection).values({
        userId: locals.user.id,
        name: form.data.name,
        description: form.data.description,
        slug: kebabCase(form.data.name),
      });
    } catch (error) {
      console.error('Failed to create collection:', error);

      return message(form, {
        type: 'error',
        text: 'Failed to create collection',
      });
    }

    return message(form, {
      type: 'success',
      text: 'Collection created successfully',
    });
  },
};
