<script lang="ts">
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';
  import * as Sidebar from '$lib/components/ui/sidebar';

  let { data, children } = $props();
</script>

<Sidebar.Provider style="--sidebar-width: 18rem; --sidebar-width-mobile: 20rem;">
  <AppSidebar />
  <Sidebar.Inset>
    <div class="container">
      <div class="flex min-h-12 w-full items-center py-2">
        <div class="inline-flex w-1/2 items-center justify-start">
          <Sidebar.Trigger />
        </div>
        <div class="inline-flex w-1/2 items-center justify-end">
          <Button href="/profile" variant="outline">
            {data.session.user.name}
            <Avatar.Root class="size-6">
              <Avatar.Image src={data.session.user.image} alt={data.session.user.name} />
              <Avatar.Fallback>{data.session.user.name.charAt(0)}</Avatar.Fallback>
            </Avatar.Root>
          </Button>
        </div>
      </div>
      <div class="typography py-4">
        {@render children()}
      </div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
