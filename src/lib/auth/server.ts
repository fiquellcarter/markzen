import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';

if (!env.BETTER_AUTH_GITHUB_CLIENT_ID) {
  throw new Error('BETTER_AUTH_GITHUB_CLIENT_ID is not set');
}

if (!env.BETTER_AUTH_GITHUB_CLIENT_SECRET) {
  throw new Error('BETTER_AUTH_GITHUB_CLIENT_SECRET is not set');
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});

export type Session = typeof auth.$Infer.Session;
