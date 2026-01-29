import { defineBaseMetaTags } from 'svelte-meta-tags';

export function load({ url }) {
  const baseTags = defineBaseMetaTags({
    title: 'Save and organize your links. Simply.',
    titleTemplate: '%s • Markzen',
    description:
      'Markzen is a minimal bookmark manager to save links and organize bookmarks into simple collections.',
    canonical: new URL(url.pathname, url.origin).href,
    keywords: [
      'bookmark collections',
      'bookmark manager',
      'bookmark organizer',
      'link manager',
      'manage links online',
      'minimal bookmark manager',
      'organize bookmarks',
      'save bookmarks',
      'save links',
      'simple bookmark manager',
    ],
    twitter: {
      cardType: 'summary_large_image',
      title: 'Save and organize your links. Simply.',
      description:
        'Markzen is a minimal bookmark manager to save links and organize bookmarks into simple collections.',
      creator: '@fiquellcarter',
      image: `${new URL(url.pathname, url.origin).href}opengraph-image.png`,
      imageAlt: 'Markzen',
    },
    openGraph: {
      url: new URL(url.pathname, url.origin).href,
      type: 'website',
      title: 'Save and organize your links. Simply.',
      description:
        'Markzen is a minimal bookmark manager to save links and organize bookmarks into simple collections.',
      images: [
        {
          url: `${new URL(url.pathname, url.origin).href}opengraph-image.png`,
          alt: 'Markzen',
          width: 1200,
          height: 630,
        },
      ],
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
