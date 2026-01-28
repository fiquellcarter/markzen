import { defineBaseMetaTags } from 'svelte-meta-tags';

export function load({ url }) {
  const baseTags = defineBaseMetaTags({
    title: 'Your Links, Your Way',
    titleTemplate: '%s • Markzen',
    description: 'A simple place to save and organize everything you find online.',
    canonical: new URL(url.pathname, url.origin).href,
    keywords: ['bookmarks', 'links', 'save', 'organize'],
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
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  });

  return {
    ...baseTags,
  };
}
