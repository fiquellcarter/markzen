<script lang="ts">
  import { Folders, GalleryVerticalEnd, Inbox, Plus } from '@lucide/svelte';
  import type { InferSelectModel } from 'drizzle-orm';
  import { toast } from 'svelte-sonner';
  import { getFlash } from 'sveltekit-flash-message';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import DarkLogo from '$lib/assets/dark-logo.png';
  import LightLogo from '$lib/assets/light-logo.png';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import * as Sidebar from '$lib/components/ui/sidebar';
  import { Spinner } from '$lib/components/ui/spinner';
  import { Textarea } from '$lib/components/ui/textarea';
  import { createBookmarkSchema, type CreateBookmarkSchema } from '$lib/schemas/bookmark';
  import { createCollectionSchema, type CreateCollectionSchema } from '$lib/schemas/collection';
  import type { collection } from '$lib/server/db/schema';

  let {
    collections,
    createCollectionForm,
    createBookmarkForm,
  }: {
    collections: InferSelectModel<typeof collection>[];
    createCollectionForm: SuperValidated<Infer<CreateCollectionSchema>>;
    createBookmarkForm: SuperValidated<Infer<CreateBookmarkSchema>>;
  } = $props();

  let isCreateCollectionDialogOpen = $state(false);
  let isCreateBookmarkDialogOpen = $state(false);
  let selectedCollectionId = $state('');

  // svelte-ignore state_referenced_locally
  const {
    form: collectionForm,
    errors: collectionErrors,
    constraints: collectionConstraints,
    submitting: collectionSubmitting,
    enhance: collectionEnhance,
  } = superForm(createCollectionForm, {
    id: 'collection-form',
    validators: zod4(createCollectionSchema),
    onResult({ result }) {
      if (result.type === 'redirect') {
        isCreateCollectionDialogOpen = false;
      }
    },
  });

  // svelte-ignore state_referenced_locally
  const {
    form: bookmarkForm,
    errors: bookmarkErrors,
    constraints: bookmarkConstraints,
    submitting: bookmarkSubmitting,
    enhance: bookmarkEnhance,
  } = superForm(createBookmarkForm, {
    id: 'bookmark-form',
    validators: zod4(createBookmarkSchema),
    onResult({ result }) {
      if (result.type === 'success') {
        isCreateBookmarkDialogOpen = false;
      }
    },
  });

  const collectionsById = $derived(
    Object.fromEntries(collections.map((collection) => [collection.id, collection]))
  );

  const collectionLabel = $derived(
    selectedCollectionId
      ? (collectionsById[selectedCollectionId]?.name ?? 'Choose a collection')
      : 'Unsorted'
  );

  const items = [
    { title: 'All Bookmarks', url: '/dashboard', icon: GalleryVerticalEnd },
    { title: 'Unsorted', url: '/unsorted', icon: Inbox },
  ] as const;

  const flash = getFlash(page);

  $effect(() => {
    if (!$flash) {
      return;
    }

    toast[$flash.type]($flash.message);

    $flash = undefined;
  });

  $effect(() => {
    $bookmarkForm.collectionId = selectedCollectionId === '' ? null : selectedCollectionId;
  });
</script>

<Sidebar.Root variant="floating" collapsible="icon">
  <Sidebar.Header class="group-data-[collapsible=icon]:hidden">
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg" tooltipContent="Markzen">
          {#snippet child({ props })}
            <a href={resolve('/dashboard')} {...props}>
              <img
                src={LightLogo}
                alt="Markzen Logo"
                class="mb-1 ml-1 hidden h-auto w-20 dark:inline" />
              <img src={DarkLogo} alt="Markzen Logo" class="mb-1 ml-1 h-auto w-20 dark:hidden" />
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
              <Sidebar.MenuButton tooltipContent={item.title}>
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
      <Sidebar.GroupLabel>Your Collections</Sidebar.GroupLabel>
      <Sidebar.GroupAction onclick={() => (isCreateCollectionDialogOpen = true)}>
        <Plus />
        <span class="sr-only">Create Collection</span>
      </Sidebar.GroupAction>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each collections as collection (collection.id)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton tooltipContent={collection.name}>
                {#snippet child({ props })}
                  <a href={resolve(`/collection/${collection.slug}`)} {...props}>
                    <Folders />
                    <span>{collection.name}</span>
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
        <Sidebar.MenuButton
          variant="outline"
          tooltipContent="Add Bookmark"
          onclick={() => (isCreateBookmarkDialogOpen = true)}>
          <Plus />
          Add Bookmark
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>

<Dialog.Root bind:open={isCreateCollectionDialogOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>New Collection</Dialog.Title>
      <Dialog.Description>
        Group your bookmarks into collections to stay organized.
      </Dialog.Description>
    </Dialog.Header>
    <form id="collection-form" action="/collection/create" method="POST" use:collectionEnhance>
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="name">Name</Field.Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., UI Inspiration"
              aria-invalid={$collectionErrors.name ? 'true' : undefined}
              bind:value={$collectionForm.name}
              {...$collectionConstraints.name} />
            {#if $collectionErrors.name}
              <Field.FieldError>{$collectionErrors.name}</Field.FieldError>
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
              aria-invalid={$collectionErrors.description ? 'true' : undefined}
              bind:value={$collectionForm.description}
              {...$collectionConstraints.description} />
            {#if $collectionErrors.description}
              <Field.FieldError>{$collectionErrors.description}</Field.FieldError>
            {:else}
              <Field.Description>What this collection is for (optional).</Field.Description>
            {/if}
          </Field.Field>
        </Field.Group>
      </Field.Set>
    </form>
    <Dialog.Footer class="pt-6">
      <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
      <Button type="submit" form="collection-form" disabled={$collectionSubmitting}>
        {#if $collectionSubmitting}
          <Spinner />
        {/if}
        Create Collection
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={isCreateBookmarkDialogOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>New Bookmark</Dialog.Title>
      <Dialog.Description>Save a link to access it later.</Dialog.Description>
    </Dialog.Header>
    <form id="bookmark-form" action="/bookmark/create" method="POST" use:bookmarkEnhance>
      <input type="hidden" name="collectionId" bind:value={$bookmarkForm.collectionId} />
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="url">URL</Field.Label>
            <Input
              type="url"
              id="url"
              name="url"
              placeholder="https://example.com"
              aria-invalid={$bookmarkErrors.url ? 'true' : undefined}
              bind:value={$bookmarkForm.url}
              {...$bookmarkConstraints.url} />
            {#if $bookmarkErrors.url}
              <Field.FieldError>{$bookmarkErrors.url}</Field.FieldError>
            {:else}
              <Field.Description>The link you want to save.</Field.Description>
            {/if}
          </Field.Field>
          <Field.Field>
            <Field.Label for="collection">Collection</Field.Label>
            <Select.Root type="single" bind:value={selectedCollectionId}>
              <Select.Trigger id="collection">
                {collectionLabel}
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="">Unsorted</Select.Item>
                {#each collections as collection (collection.id)}
                  <Select.Item value={collection.id}>{collection.name}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
            <Field.Description>Pick a collection for this bookmark.</Field.Description>
          </Field.Field>
        </Field.Group>
      </Field.Set>
    </form>
    <Dialog.Footer class="pt-6">
      <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
      <Button type="submit" form="bookmark-form" disabled={$bookmarkSubmitting}>
        {#if $bookmarkSubmitting}
          <Spinner />
        {/if}
        Save Bookmark
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
