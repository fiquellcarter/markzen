import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { deleteBookmarkSchema, updateBookmarkSchema } from '$lib/schemas/bookmark';

export async function load() {
  const [updateBookmarkForm, deleteBookmarkForm] = await Promise.all([
    superValidate(zod4(updateBookmarkSchema)),
    superValidate(zod4(deleteBookmarkSchema)),
  ]);

  return {
    updateBookmarkForm,
    deleteBookmarkForm,
  };
}
