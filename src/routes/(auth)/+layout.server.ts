import { redirect } from '@sveltejs/kit';

import { auth } from '$lib/auth/server';

export async function load({ request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    return redirect(302, '/dashboard');
  }

  return {};
}
