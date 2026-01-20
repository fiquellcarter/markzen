declare global {
  type BookmarkWithHost = import('drizzle-orm').InferSelectModel<
    typeof import('$lib/server/db/schema').bookmark
  > & {
    host: string;
  };

  namespace App {
    interface Locals {
      session: import('better-auth').Session;
      user: import('better-auth').User;
    }

    interface PageData {
      flash?: {
        type: 'success' | 'error';
        message: string;
      };
    }

    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
