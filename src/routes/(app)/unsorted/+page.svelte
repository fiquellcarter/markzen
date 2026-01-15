<script lang="ts">
  import { LayoutGrid, LayoutList } from '@lucide/svelte';

  import { Button } from '$lib/components/ui/button';
  import * as ButtonGroup from '$lib/components/ui/button-group';
</script>

<section>
  <div class="flex items-center justify-between gap-4">
    <div>
      <h1>Unsorted</h1>
      <p class="text-muted-foreground">You have 6 bookmarks saved here.</p>
    </div>
    <ButtonGroup.Root>
      <Button variant="default" size="icon">
        <LayoutGrid />
        <span class="sr-only">Grid View</span>
      </Button>
      <Button variant="outline" size="icon">
        <LayoutList />
        <span class="sr-only">List View</span>
      </Button>
    </ButtonGroup.Root>
  </div>
</section>
