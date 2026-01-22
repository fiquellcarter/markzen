<script lang="ts">
  import {
    Bookmark,
    ExternalLink,
    Folders,
    LayoutGrid,
    LayoutList,
    Settings2,
  } from '@lucide/svelte';
  import { format } from 'date-fns';
  import { charAt, toUpperCase } from 'string-ts';
  import { superForm } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import BookmarkManageDialogs from '$lib/components/bookmark-manage-dialogs.svelte';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as ButtonGroup from '$lib/components/ui/button-group';
  import * as Card from '$lib/components/ui/card';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Empty from '$lib/components/ui/empty';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { Spinner } from '$lib/components/ui/spinner';
  import { Textarea } from '$lib/components/ui/textarea';
  import { deleteCollectionSchema, updateCollectionSchema } from '$lib/schemas/collection';
  import { cn } from '$lib/utils';

  let { data } = $props();

  let view = $state<'grid' | 'list'>('grid');
  let isUpdateDialogOpen = $state(false);
  let isDeleteDialogOpen = $state(false);
  let dialogs = $state<{
    openUpdateDialog: (data: BookmarkWithHost) => void;
  } | null>(null);

  // svelte-ignore state_referenced_locally
  const {
    form: updateForm,
    errors: updateErrors,
    constraints: updateConstraints,
    submitting: updateSubmitting,
    enhance: updateEnhance,
  } = superForm(data.updateCollectionForm, {
    id: 'update-form',
    validators: zod4(updateCollectionSchema),
    onResult({ result }) {
      if (result.type === 'redirect') {
        isUpdateDialogOpen = false;
      }
    },
  });

  // svelte-ignore state_referenced_locally
  const {
    form: deleteForm,
    submitting: deleteSubmitting,
    enhance: deleteEnhance,
  } = superForm(data.deleteCollectionForm, {
    id: 'delete-form',
    validators: zod4(deleteCollectionSchema),
    onResult({ result }) {
      if (result.type === 'redirect') {
        isDeleteDialogOpen = false;
      }
    },
  });

  const collectionBookmarks = $derived(
    data.bookmarks
      .filter((bookmark) => bookmark.collectionId === data.collection.id)
      .map((bookmark) => ({
        ...bookmark,
        host: new URL(bookmark.url).hostname,
      }))
  );

  const hasBookmarks = $derived(collectionBookmarks.length > 0);
</script>

<section class="flex flex-col gap-4">
  <div class="flex items-center justify-between gap-2">
    <div>
      <h1>{data.collection.name}</h1>
      <p class="text-muted-foreground">
        {#if data.collection.description}
          <span>{data.collection.description} •</span>
        {/if}
        <span>You have {collectionBookmarks.length} bookmark(s) saved.</span>
      </p>
    </div>
    <div class="sm:flex sm:h-6 sm:items-center sm:gap-2">
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
      <Separator orientation="vertical" class="hidden sm:block" />
      <Button variant="outline" size="icon" onclick={() => (isUpdateDialogOpen = true)}>
        <Settings2 />
        <span class="sr-only">Manage Collection</span>
      </Button>
    </div>
  </div>
  {#if !hasBookmarks}
    <Empty.Root class="py-28 sm:py-56">
      <Empty.Header>
        <Empty.Media variant="icon">
          <Bookmark />
        </Empty.Media>
        <Empty.Title>No Bookmarks</Empty.Title>
        <Empty.Description class="text-pretty">
          This collection doesn't have any bookmarks yet.
        </Empty.Description>
      </Empty.Header>
    </Empty.Root>
  {:else}
    <div
      class={cn(
        'grid grid-cols-1 gap-2',
        view === 'grid' && 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      )}>
      {#each collectionBookmarks as bookmark (bookmark.id)}
        <Card.Root class="group not-typography">
          <Card.Header>
            <Card.Title class="flex items-center gap-2">
              <Avatar.Root class="size-4">
                <Avatar.Image src={bookmark.favicon} alt={bookmark.title} />
                <Avatar.Fallback>
                  {toUpperCase(charAt(bookmark.title, 0))}
                </Avatar.Fallback>
              </Avatar.Root>
              <p class="line-clamp-1">{bookmark.title}</p>
            </Card.Title>
            <Card.Description>
              {bookmark.host}
            </Card.Description>
            <Card.Action class="lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
              <Button
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="icon">
                <ExternalLink />
                <span class="sr-only">Open Link</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onclick={() => dialogs?.openUpdateDialog(bookmark)}>
                <Settings2 />
                <span class="sr-only">Manage Bookmark</span>
              </Button>
            </Card.Action>
          </Card.Header>
          <Card.Content>
            <p class="line-clamp-2">{bookmark.description}</p>
          </Card.Content>
          <Card.Footer class="mt-auto flex items-center justify-between gap-2">
            <Badge variant="secondary">
              <Folders />
              {data.collection.name}
            </Badge>
            <p class="line-clamp-1 text-sm text-muted-foreground">
              {format(bookmark.updatedAt, 'PP')}
            </p>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  {/if}
</section>

<Dialog.Root bind:open={isUpdateDialogOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit Collection</Dialog.Title>
      <Dialog.Description>Rename this collection or add a description.</Dialog.Description>
    </Dialog.Header>
    <form id="update-form" action="?/update" method="POST" use:updateEnhance>
      <input type="hidden" name="id" bind:value={$updateForm.id} />
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="name">Name</Field.Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., UI Inspiration"
              aria-invalid={$updateErrors.name ? 'true' : undefined}
              bind:value={$updateForm.name}
              {...$updateConstraints.name} />
            {#if $updateErrors.name}
              <Field.FieldError>{$updateErrors.name}</Field.FieldError>
            {:else}
              <Field.Description>A memorable name for this collection.</Field.Description>
            {/if}
          </Field.Field>
          <Field.Field>
            <Field.Label for="description">Description</Field.Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add details (optional)"
              aria-invalid={$updateErrors.description ? 'true' : undefined}
              bind:value={$updateForm.description}
              {...$updateConstraints.description} />
            {#if $updateErrors.description}
              <Field.FieldError>{$updateErrors.description}</Field.FieldError>
            {:else}
              <Field.Description>What this collection is for (optional).</Field.Description>
            {/if}
          </Field.Field>
        </Field.Group>
      </Field.Set>
    </form>
    <Dialog.Footer class="flex-col pt-6 sm:justify-between">
      <div>
        <Button
          variant="destructive"
          onclick={() => ((isDeleteDialogOpen = true), (isUpdateDialogOpen = false))}>
          Delete Collection
        </Button>
      </div>
      <div class="flex items-center gap-2">
        <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
        <Button type="submit" form="update-form" disabled={$updateSubmitting}>
          {#if $updateSubmitting}
            <Spinner />
          {/if}
          Save Changes
        </Button>
      </div>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={isDeleteDialogOpen}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>Delete this collection?</AlertDialog.Title>
      <AlertDialog.Description>
        This will remove the collection and its bookmarks. You can always add them to another
        collection later.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <form id="delete-form" action="?/delete" method="POST" use:deleteEnhance>
      <input type="hidden" name="id" bind:value={$deleteForm.id} />
    </form>
    <AlertDialog.Footer>
      <AlertDialog.Cancel onclick={() => (isUpdateDialogOpen = true)}>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        type="submit"
        form="delete-form"
        disabled={$deleteSubmitting}
        class={buttonVariants({ variant: 'destructive' })}>
        {#if $deleteSubmitting}
          <Spinner />
        {/if}
        Delete Collection
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<BookmarkManageDialogs
  bind:this={dialogs}
  collections={data.collections}
  updateBookmarkForm={data.updateBookmarkForm}
  deleteBookmarkForm={data.deleteBookmarkForm} />
