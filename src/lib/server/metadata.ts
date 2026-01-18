import * as cheerio from 'cheerio';

const USER_AGENT = 'Mozilla/5.0 (compatible; Markzen/1.0; +http://localhost:5173)';
const FETCH_TIMEOUT = 10_000;

const TITLES = [
  "Title? What Title? We Don't Do That Here.",
  'This Page Just Woke Up And Chose Violence.',
  '404 Title Not Found... but the vibes? Immaculate.',
  'We ran out of budget for titles, sorry not sorry.',
];
const DESCRIPTIONS = [
  'The description was kidnapped by gremlins at 3:17 AM. Send help... or pizza.',
  'This page is 87% vibes, 12% chaos, and 1% actual content.',
  'Developer promised a description in 2019. Still waiting.',
  "You've reached the loading screen of life. Enjoy the existential void.",
];

export async function extractMetadata(url: string) {
  const parsedUrl = new URL(url);

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('Invalid URL protocol');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    signal: controller.signal,
  });

  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error('Failed to fetch URL');
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const title =
    $('title').text() ??
    $('meta[property="og:title"]').attr('content') ??
    TITLES[Math.floor(Math.random() * TITLES.length)];
  const description =
    $('meta[name="description"]').attr('content') ??
    $('meta[property="og:description"]').attr('content') ??
    DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
  const faviconHref = $('link[rel="icon"]').attr('href') ?? '/favicon.ico';
  const favicon = new URL(faviconHref, url).href;

  return { title, description, favicon };
}
