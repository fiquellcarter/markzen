<script lang="ts">
  import { Chromium, Globe, Shield } from '@lucide/svelte';
  import { charAt, toUpperCase } from 'string-ts';

  import Features from '$lib/components/marketing/features.svelte';
  import Hero from '$lib/components/marketing/hero.svelte';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';

  const testimonials = [
    {
      name: 'Théo Balick',
      image: 'https://avatars.githubusercontent.com/u/68236786?v=4',
      content:
        'Tailark has transformed the way I develop web applications. The flexibility to customize every aspect is amazing.',
    },
    {
      name: 'Glodie Lukose',
      image: 'https://avatars.githubusercontent.com/u/99137927?v=4',
      content:
        'The extensive collection of UI components has significantly accelerated my workflow. Tailark is a game-changer.',
    },
  ];
</script>

<Hero />
<Features />

<section class="container max-w-4xl py-32">
  <div class="mb-12 text-center">
    <h2>Loved by people</h2>
    <p class="text-muted-foreground">What do people think about our product.</p>
  </div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {#each testimonials as testimonial (testimonial.name)}
      <div>
        <div class="rounded-2xl rounded-bl border bg-card/20 px-4 py-3 text-card-foreground">
          <p>{testimonial.content}</p>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <Avatar.Root class="size-6">
            <Avatar.Image src={testimonial.image} alt={testimonial.name} />
            <Avatar.Fallback>
              {toUpperCase(charAt(testimonial.name, 0))}
            </Avatar.Fallback>
          </Avatar.Root>
          <p class="text-sm font-medium">{testimonial.name}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<section class="container py-32">
  <div
    class="relative mx-auto max-w-4xl overflow-hidden rounded-4xl border bg-card/20 px-2 py-12 text-center text-card-foreground md:px-12">
    <div
      class="absolute top-0 right-0 h-3/5 w-2/5 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 blur-[6.25rem]">
    </div>
    <div class="mx-auto mb-12 flex max-w-xl flex-col gap-6">
      <div class="flex items-center justify-center gap-4">
        <div class="flex size-12 items-center justify-center rounded-full border">
          <Chromium class="text-muted-foreground" />
        </div>
        <div class="flex size-12 items-center justify-center rounded-full border">
          <Shield class="text-muted-foreground" />
        </div>
        <div class="flex size-12 items-center justify-center rounded-full border">
          <Globe class="text-muted-foreground" />
        </div>
      </div>
      <h2>
        Surf the Clouds
        <br />
        Markzen on Every Browser
      </h2>
      <p class="text-muted-foreground">
        Access Markzen through Chrome, Firefox, Safari, and Edge extensions, enabling you to
        effortlessly save and organize all your crucial web pages and information.
      </p>
    </div>
    <Button href="/sign-in" size="lg">Coming Soon</Button>
  </div>
</section>
