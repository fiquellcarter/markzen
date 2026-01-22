import { definePageMetaTags } from 'svelte-meta-tags';

export function load() {
  const pageTags = definePageMetaTags({
    title: 'Welcome to Markzen',
  });

  return {
    ...pageTags,
  };
}
