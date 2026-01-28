<script lang="ts">
  import { ArrowRight, Bookmark, Palette, Smartphone } from '@lucide/svelte';

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
    <div class="flex flex-col gap-4 rounded-2xl border p-8 sm:col-span-7">
      <div>
        <h3>Organize Like a Pro</h3>
        <p class="text-muted-foreground">Effortless organization, unmatched simplicity.</p>
      </div>
      <div class="h-64 w-full rounded-2xl bg-card/40 p-4">
        <div class="flex size-full gap-4">
          <div class="h-full w-1/3 rounded-2xl bg-card/80"></div>
          <div class="flex flex-1 flex-col gap-4">
            <div class="h-1/2 rounded-2xl bg-primary/10"></div>
            <div class="flex-1 rounded-2xl bg-card/80"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between rounded-2xl border p-8 sm:col-span-5">
      <div>
        <h3>Customizable Views</h3>
        <p class="text-muted-foreground">View your bookmarks your way.</p>
      </div>
      <div class="flex justify-center gap-2">
        <div class="h-52 w-full -rotate-12 rounded-2xl bg-card/80"></div>
        <div class="h-52 w-full -rotate-12 rounded-2xl bg-primary/10"></div>
      </div>
    </div>
    <div class="rounded-2xl border p-8 sm:col-span-4">
      <div class="flex size-10 items-center justify-center rounded-full border text-primary">
        <Palette />
      </div>
      <h3>Personalize to Your Liking</h3>
      <p class="text-muted-foreground">Custom boards, a seamless browsing experience.</p>
    </div>
    <div class="flex justify-between overflow-hidden rounded-2xl border p-8 sm:col-span-8">
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
      <div class="h-64 w-56 translate-y-12 rotate-6 rounded-2xl bg-card/40 p-4">
        <div class="flex flex-col gap-4">
          <div class="h-2 w-full rounded-2xl bg-card/80"></div>
          <div class="h-32 w-full rounded-2xl bg-primary/10"></div>
          <div class="flex flex-col gap-2">
            <div class="h-2 w-3/4 rounded-2xl bg-card/80"></div>
            <div class="h-2 w-1/2 rounded-2xl bg-card/60"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
