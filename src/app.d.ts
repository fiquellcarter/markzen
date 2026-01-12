declare global {
  namespace App {
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
