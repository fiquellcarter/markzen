import { defineBaseMetaTags } from 'svelte-meta-tags';

import favicon from '$lib/assets/favicon.svg';

export function load({ url }) {
  const baseTags = defineBaseMetaTags({
    title: 'Your Links, Your Way',
    titleTemplate: '%s • Markzen',
    description: 'A simple place to save and organize everything you find online.',
    canonical: new URL(url.pathname, url.origin).href,
    twitter: {
      cardType: 'summary_large_image',
      title: 'Your Links, Your Way',
      description: 'A simple place to save and organize everything you find online.',
      creator: '@fiquellcarter',
    },
    openGraph: {
      title: 'Your Links, Your Way',
      description: 'A simple place to save and organize everything you find online.',
      type: 'website',
      url: new URL(url.pathname, url.origin).href,
      siteName: 'Markzen',
    },
    additionalLinkTags: [
      {
        rel: 'icon',
        href: favicon,
      },
    ],
  });

  return {
    ...baseTags,
  };
}
