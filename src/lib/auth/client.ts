import { createAuthClient } from 'better-auth/svelte';

export const auth = createAuthClient();

export type Session = typeof auth.$Infer.Session;
