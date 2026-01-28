<script lang="ts">
  import { Chromium, Globe, Shield } from '@lucide/svelte';

  import { Button } from '$lib/components/ui/button';
</script>

<section class="container max-w-4xl py-32">
  <div
    class="relative overflow-hidden rounded-2xl border bg-card/20 px-2 py-12 text-center text-card-foreground sm:px-12">
    <div
      class="absolute top-0 right-0 h-3/5 w-2/5 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 blur-[6.25rem]">
    </div>
    <div class="mx-auto mb-16 flex max-w-xl flex-col gap-4">
      <div class="flex items-center justify-center gap-4">
        <div class="flex size-12 items-center justify-center rounded-full border text-primary">
          <Chromium />
        </div>
        <div class="flex size-12 items-center justify-center rounded-full border text-primary">
          <Shield />
        </div>
        <div class="flex size-12 items-center justify-center rounded-full border text-primary">
          <Globe />
        </div>
      </div>
      <h2>
        Surf the Clouds
        <br />
        Markzen on Every Browser
      </h2>
      <p class="text-muted-foreground">
        Access Markzen through Chrome, Edge, Firefox, and Safari extensions, enabling you to
        effortlessly save and organize all your crucial web pages and information.
      </p>
    </div>
    <Button href="/sign-in" size="lg">Coming Soon</Button>
  </div>
</section>
