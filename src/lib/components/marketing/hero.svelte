<script lang="ts">
  import { ArrowRight, MessageCircle } from '@lucide/svelte';

  import DarkDashboardScreenshot from '$lib/assets/dark-dashboard-screenshot.png';
  import LightDashboardScreenshot from '$lib/assets/light-dashboard-screenshot.png';
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
  <div class="container max-w-5xl">
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
            class="absolute -inset-16 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[20px_20px] [--color-border:color-mix(in_oklab,var(--color-foreground)_30%,transparent)]">
          </div>
          <div class="absolute inset-0 z-20 bg-linear-to-l from-background to-transparent"></div>
          <div class="absolute inset-0 z-20 bg-linear-to-t from-background to-transparent"></div>
          <img
            class="relative z-10 dark:hidden"
            src={LightDashboardScreenshot}
            alt="Light dashboard screenshot" />
          <img
            class="relative z-10 hidden dark:inline"
            src={DarkDashboardScreenshot}
            alt="Dark dashboard screenshot" />
        </div>
      </div>
    </div>
  </div>
</section>
