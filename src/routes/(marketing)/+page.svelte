<script lang="ts">
  import { ArrowRight, Chrome, Chromium, Globe, MessageCircle, Shield } from '@lucide/svelte';

  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
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
  <div class="container max-w-2xl py-32">
    <div class="relative z-20 flex flex-col items-center gap-8 text-center">
      <Badge variant="outline" class="animate-pulse">
        <MessageCircle class="text-primary" />
        Markzen 2.0 is Coming Soon
      </Badge>
      <h1>Bookmark manager, revolutionized.</h1>
      <p>
        Easy-to-use, Markzen lets you save, customize, and manage all your bookmarks and texts
        online like a breeze.
      </p>
      <div>
        <Button href="/sign-in" size="lg">
          Get Started for Free
          <ArrowRight />
        </Button>
        <p class="text-xs text-muted-foreground">No credit card required</p>
      </div>
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

<section class="container py-32">
  <div
    class="relative mx-auto max-w-4xl overflow-hidden rounded-4xl border bg-card/20 px-2 py-12 text-center md:px-12">
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
      <p class="text-lg text-muted-foreground">
        Access Markzen through Chrome, Firefox, Safari, and Edge extensions, enabling you to
        effortlessly save and organize all your crucial web pages and information.
      </p>
    </div>
    <Button href="/sign-in" size="lg">Coming Soon</Button>
  </div>
</section>
