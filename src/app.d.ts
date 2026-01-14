declare global {
  namespace App {
    namespace Superforms {
      type Message = {
        type: 'error' | 'success';
        text: string;
      };
    }

    interface Locals {
      session: import('better-auth').Session;
      user: import('better-auth').User;
    }

    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
