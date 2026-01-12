import { svelteKitHandler } from 'better-auth/svelte-kit';

import { building } from '$app/environment';
import { auth } from '$lib/auth/server';

export async function handle({ event, resolve }) {
  return svelteKitHandler({ event, resolve, auth, building });
}
