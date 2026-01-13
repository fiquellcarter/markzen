<script lang="ts">
  import { Folders, GalleryVerticalEnd, Inbox, LoaderPinwheel, Plus } from '@lucide/svelte';

  import { resolve } from '$app/paths';
  import * as Sidebar from '$lib/components/ui/sidebar';

  const items = [
    { title: 'All', url: '/dashboard', icon: GalleryVerticalEnd },
    { title: 'Unsorted', url: '/unsorted', icon: Inbox },
  ] as const;

  const collections = [
    { title: 'Design', url: '/', icon: Folders },
    { title: 'Developer', url: '/', icon: Folders },
  ] as const;
</script>

<Sidebar.Root variant="inset" collapsible="icon">
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href={resolve('/dashboard')} {...props}>
              <LoaderPinwheel />
              <span class="font-semibold">Markzen</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={resolve(item.url)} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Collections</Sidebar.GroupLabel>
      <Sidebar.GroupAction>
        <Plus />
        <span class="sr-only">Add Collection</span>
      </Sidebar.GroupAction>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each collections as collection (collection.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={resolve(collection.url)} {...props}>
                    <collection.icon />
                    <span>{collection.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton variant="outline">
          <Plus />
          Add Bookmark
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
