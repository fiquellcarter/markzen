import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { auth } from '$lib/auth/server';
import { createCollectionSchema } from '$lib/schemas/collection';

export async function load({ request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return redirect(302, '/sign-in');
  }

  const createCollectionForm = await superValidate(zod4(createCollectionSchema));

  return {
    session,
    createCollectionForm,
  };
}
