<script lang="ts">
  import {
    ArrowRight,
    Bookmark,
    Chromium,
    CreditCard,
    Globe,
    MessageCircle,
    Palette,
    Shield,
    Smartphone,
  } from '@lucide/svelte';
  import { charAt, toUpperCase } from 'string-ts';

  import * as Avatar from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge';
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

<section class="relative overflow-hidden">
  <div class="absolute inset-0 z-20 opacity-80">
    <div
      class="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]">
    </div>
    <div
      class="absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]">
    </div>
    <div
      class="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]">
    </div>
  </div>
  <div class="relative z-20 container max-w-2xl py-32 text-center">
    <Badge variant="outline" class="mb-2">
      <MessageCircle class="text-primary" />
      Markzen 2.0 is Coming Soon
    </Badge>
    <h1 class="mb-8">Bookmark manager, revolutionized.</h1>
    <p class="mb-12">
      Easy-to-use, Markzen lets you save, customize, and manage all your bookmarks and texts online
      like a breeze.
    </p>
    <div>
      <Button href="/sign-in" size="lg">
        Get Started for Free
        <ArrowRight />
      </Button>
      <p class="text-sm text-muted-foreground">No credit card required</p>
    </div>
  </div>
  <div class="container max-w-6xl">
    <div class="-mt-16 -mr-16 pl-16 perspective-distant">
      <div class="transform-[rotateX(10deg)]">
        <div class="relative skew-x-[.50rad]">
          <div
            class="absolute -inset-16 z-10 bg-linear-to-r from-background via-transparent to-background">
          </div>
          <div
            class="absolute -inset-16 z-10 bg-linear-to-b from-background via-transparent to-background">
          </div>
          <div
            class="absolute -inset-16 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[20px_20px] [--color-border:color-mix(in_oklab,var(--color-foreground)_40%,transparent)]">
          </div>
          <div class="absolute inset-0 z-20 bg-linear-to-l from-background to-transparent"></div>
          <div class="absolute inset-0 z-20 bg-linear-to-t from-background to-transparent"></div>
          <img
            class="relative z-10 rounded-lg border dark:hidden"
            src="https://i.ytimg.com/vi/C2eluNJDNtE/hq720.jpg"
            alt="Dashboard screenshot" />
          <img
            class="relative z-10 hidden rounded-lg border dark:block"
            src="https://s3-alpha.figma.com/hub/file/3988952835/9a3f2da3-7323-43bb-a1a3-6a154ff02a78-cover.png"
            alt="Dashboard screenshot" />
        </div>
      </div>
    </div>
  </div>
</section>

<section class="container max-w-4xl py-32">
  <div class="mb-12 text-center">
    <div class="mb-6 flex justify-center">
      <div class="flex size-12 items-center justify-center rounded-full border">
        <Bookmark class="text-primary" />
      </div>
    </div>
    <h2>
      The all-in-one
      <br />
      bookmark manager
    </h2>
    <p class="text-muted-foreground">Save and Organize Your Web Finds Seamlessly.</p>
  </div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-12">
    <div class="group flex flex-col justify-between rounded-2xl border p-8 sm:col-span-7">
      <div>
        <h3>Organize Like a Pro</h3>
        <p class="text-muted-foreground">Effortless organization, unmatched simplicity.</p>
      </div>
      <div
        class="relative mt-4 h-64 w-full translate-y-4 rounded-2xl bg-card/40 p-4 transition-transform duration-300 group-hover:translate-y-0">
        <div class="flex h-full gap-4">
          <div class="h-full w-1/3 rounded-2xl bg-card/80"></div>
          <div class="flex flex-1 flex-col gap-4">
            <div class="h-1/2 rounded-2xl bg-primary/10"></div>
            <div class="flex-1 rounded-2xl bg-card/80"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="group flex flex-col justify-between rounded-2xl border p-8 md:col-span-5">
      <div>
        <h3>Customizable Views</h3>
        <p class="text-muted-foreground">View your bookmarks your way.</p>
      </div>
      <div class="flex justify-center gap-2">
        <div
          class="h-48 w-48 -rotate-12 transform rounded-2xl bg-card/80 transition-transform duration-300 group-hover:-translate-y-2">
        </div>
        <div
          class="h-48 w-48 -rotate-12 transform rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:-translate-y-2">
        </div>
      </div>
    </div>
    <div class="rounded-2xl border p-8 md:col-span-4">
      <div
        class="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/20 text-primary">
        <Palette />
      </div>
      <h3>Personalize to Your Liking</h3>
      <p class="text-sm text-muted-foreground">
        Tailored experience: custom boards, icons, a seamless browsing experience.
      </p>
    </div>
    <div
      class="flex items-start justify-between overflow-hidden rounded-2xl border p-8 md:col-span-8">
      <div class="max-w-[50%]">
        <div
          class="flex size-10 items-center justify-center rounded-full border border-accent/20 bg-accent/20 text-accent-foreground">
          <Smartphone />
        </div>
        <h3>Mobile Experience</h3>
        <p class="mb-8 text-muted-foreground">
          Access Markzen seamlessly on the go. Enjoy a great experience on mobile devices.
        </p>
        <Button href="/sign-in" variant="ghost">
          Try Markzen Now
          <ArrowRight />
        </Button>
      </div>
      <div class="h-64 w-56 translate-y-12 rotate-6 rounded-2xl bg-card/40">
        <div class="flex flex-col gap-4 p-4">
          <div class="h-2 w-full rounded-lg bg-card/80"></div>
          <div class="h-32 w-full rounded-lg bg-primary/10"></div>
          <div class="flex flex-col gap-2">
            <div class="h-2 w-3/4 rounded-lg bg-card/80"></div>
            <div class="h-2 w-1/2 rounded-lg bg-card/60"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

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
