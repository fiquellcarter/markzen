<script lang="ts">
  import {
    Bookmark,
    ExternalLink,
    Folders,
    Inbox,
    LayoutGrid,
    LayoutList,
    Settings2,
  } from '@lucide/svelte';
  import { format } from 'date-fns';
  import type { InferSelectModel } from 'drizzle-orm';

  import * as Avatar from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import * as ButtonGroup from '$lib/components/ui/button-group';
  import * as Card from '$lib/components/ui/card';
  import * as Empty from '$lib/components/ui/empty';
  import type { bookmark, collection } from '$lib/server/db/schema';
  import { cn } from '$lib/utils';

  let {
    data,
  }: {
    data: {
      collections: InferSelectModel<typeof collection>[];
      bookmarks: InferSelectModel<typeof bookmark>[];
    };
  } = $props();

  let view = $state<'grid' | 'list'>('grid');
</script>

<section class="flex flex-col gap-4">
  <div class="flex items-center justify-between gap-2">
    <div>
      <h1>All Bookmarks</h1>
      <p class="text-muted-foreground">You have {data.bookmarks.length} saved bookmarks</p>
    </div>
    <ButtonGroup.Root class="hidden sm:block">
      <Button
        variant={view === 'grid' ? 'default' : 'outline'}
        size="icon"
        onclick={() => (view = 'grid')}>
        <LayoutGrid />
        <span class="sr-only">Grid View</span>
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'outline'}
        size="icon"
        onclick={() => (view = 'list')}>
        <LayoutList />
        <span class="sr-only">List View</span>
      </Button>
    </ButtonGroup.Root>
  </div>
  <div>
    {#if data.bookmarks.length === 0}
      <Empty.Root class="py-28 sm:py-56">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Bookmark />
          </Empty.Media>
          <Empty.Title>No Bookmarks Yet</Empty.Title>
          <Empty.Description class="text-pretty">
            You don't have any bookmarks to show right now. Start a favorite links to see them here!
          </Empty.Description>
        </Empty.Header>
      </Empty.Root>
    {:else}
      <div
        class={cn(
          'grid grid-cols-1 gap-2',
          view === 'grid' && 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        )}>
        {#each data.bookmarks as bookmark (bookmark.id)}
          <Card.Root class="group not-typography">
            <Card.Header>
              <Card.Title class="flex items-center gap-2">
                <Avatar.Root class="size-4">
                  <Avatar.Image src={bookmark.favicon} alt={bookmark.title} />
                  <Avatar.Fallback>{bookmark.title.charAt(0).toUpperCase()}</Avatar.Fallback>
                </Avatar.Root>
                <p class="line-clamp-1">{bookmark.title}</p>
              </Card.Title>
              <Card.Description>
                {new URL(bookmark.url).hostname}
              </Card.Description>
              <Card.Action class="lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
                <Button
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="icon">
                  <ExternalLink />
                  <span class="sr-only">Open Bookmark</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings2 />
                  <span class="sr-only">Manage Bookmark</span>
                </Button>
              </Card.Action>
            </Card.Header>
            <Card.Content>
              <p class="line-clamp-2">{bookmark.description}</p>
            </Card.Content>
            <Card.Footer class="mt-auto flex items-center justify-between gap-2">
              <Badge variant={bookmark.collectionId ? 'default' : 'outline'}>
                {#if bookmark.collectionId}
                  <Folders />
                  {data.collections.find((collection) => collection.id === bookmark.collectionId)
                    ?.name}
                {:else}
                  <Inbox />
                  Unsorted
                {/if}
              </Badge>
              <p class="line-clamp-1 text-sm text-muted-foreground">
                {format(bookmark.updatedAt, 'PP')}
              </p>
            </Card.Footer>
          </Card.Root>
        {/each}
      </div>
    {/if}
  </div>
</section>
