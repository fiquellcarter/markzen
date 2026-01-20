import { redirect } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { auth } from '$lib/auth/server';
import { createBookmarkSchema } from '$lib/schemas/bookmark';
import { createCollectionSchema } from '$lib/schemas/collection';
import { db } from '$lib/server/db';
import { collection } from '$lib/server/db/schema';

export async function load({ request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return redirect(302, '/sign-in');
  }

  const [collections, createCollectionForm, createBookmarkForm] = await Promise.all([
    db
      .select()
      .from(collection)
      .where(eq(collection.userId, session.user.id))
      .orderBy(desc(collection.updatedAt)),
    superValidate(zod4(createCollectionSchema)),
    superValidate(zod4(createBookmarkSchema)),
  ]);

  return {
    session,
    collections,
    createCollectionForm,
    createBookmarkForm,
  };
}
