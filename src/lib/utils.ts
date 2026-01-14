import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { dev } from '$app/environment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms = 2000) => {
  if (!dev) {
    return Promise.resolve();
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
};

export type WithoutChild<T> = T extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  child?: any;
}
  ? Omit<T, 'child'>
  : T;
export type WithoutChildren<T> = T extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
}
  ? Omit<T, 'children'>
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};
