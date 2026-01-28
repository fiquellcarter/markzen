<script lang="ts">
  import { ArrowRight, Bookmark, Palette, Smartphone } from '@lucide/svelte';

  import DarkDashboardScreenshot from '$lib/assets/dark-dashboard-screenshot.png';
  import DarkMobileScreenshot from '$lib/assets/dark-mobile-screenshot.png';
  import LightDashboardScreenshot from '$lib/assets/light-dashboard-screenshot.png';
  import LightMobileScreenshot from '$lib/assets/light-mobile-screenshot.png';
  import { Button } from '$lib/components/ui/button';
</script>

<section id="features" class="container max-w-4xl py-32">
  <div class="mb-16 text-center">
    <div class="mb-6 flex justify-center">
      <div
        class="flex size-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
        <Bookmark />
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
    <div class="flex flex-col justify-between gap-4 rounded-lg border p-8 sm:col-span-7">
      <div>
        <h3>Organize Like a Pro</h3>
        <p class="text-muted-foreground">Effortless organization, unmatched simplicity.</p>
      </div>
      <div class="relative h-64 w-full overflow-hidden">
        <div class="absolute inset-0 z-10 bg-linear-to-l from-background/95 to-transparent"></div>
        <div class="absolute inset-0 z-10 bg-linear-to-t from-background/95 to-transparent"></div>
        <img
          class="origin-top-left scale-200 dark:hidden"
          src={LightDashboardScreenshot}
          alt="Light dashboard screenshot" />
        <img
          class="hidden origin-top-left scale-200 dark:inline"
          src={DarkDashboardScreenshot}
          alt="Dark dashboard screenshot" />
      </div>
    </div>
    <div class="flex flex-col justify-between gap-4 rounded-lg border p-8 sm:col-span-5">
      <div>
        <h3>Customizable Views</h3>
        <p class="text-muted-foreground">View your bookmarks your way.</p>
      </div>
      <div class="relative h-64 w-full overflow-hidden">
        <div class="absolute inset-0 z-10 bg-linear-to-r from-background/95 to-transparent"></div>
        <div class="absolute inset-0 z-10 bg-linear-to-t from-background/95 to-transparent"></div>
        <img
          class="origin-top-right scale-200 dark:hidden"
          src={LightDashboardScreenshot}
          alt="Light dashboard screenshot" />
        <img
          class="hidden origin-top-right scale-200 dark:inline"
          src={DarkDashboardScreenshot}
          alt="Dark dashboard screenshot" />
      </div>
    </div>
    <div class="rounded-lg border p-8 sm:col-span-4">
      <div class="flex size-10 items-center justify-center rounded-full border text-primary">
        <Palette />
      </div>
      <h3>Personalize to Your Liking</h3>
      <p class="text-muted-foreground">Custom boards, a seamless browsing experience.</p>
    </div>
    <div class="flex justify-between gap-4 overflow-hidden rounded-lg border p-8 sm:col-span-8">
      <div class="max-w-[50%]">
        <div class="flex size-10 items-center justify-center rounded-full border text-primary">
          <Smartphone />
        </div>
        <h3>Mobile Experience</h3>
        <p class="mb-6 text-muted-foreground">
          Access Markzen seamlessly on the go. Enjoy a great experience on mobile devices.
        </p>
        <Button href="/sign-in" variant="outline" size="sm">
          Try Markzen Now
          <ArrowRight />
        </Button>
      </div>
      <div class="relative h-72 w-full translate-y-16 overflow-hidden">
        <div class="absolute inset-0 z-10 bg-linear-to-t from-background/95 to-transparent"></div>
        <img class="dark:hidden" src={LightMobileScreenshot} alt="Light mobile screenshot" />
        <img class="hidden dark:inline" src={DarkMobileScreenshot} alt="Dark mobile screenshot" />
      </div>
    </div>
  </div>
</section>
