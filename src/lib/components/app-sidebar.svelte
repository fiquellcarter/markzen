<script lang="ts">
  import { Folders, GalleryVerticalEnd, Inbox, LoaderPinwheel, Plus } from '@lucide/svelte';
  import type { InferSelectModel } from 'drizzle-orm';
  import { toast } from 'svelte-sonner';
  import { getFlash } from 'sveltekit-flash-message';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import * as Sidebar from '$lib/components/ui/sidebar';
  import { Spinner } from '$lib/components/ui/spinner';
  import { Textarea } from '$lib/components/ui/textarea';
  import { createCollectionSchema, type CreateCollectionSchema } from '$lib/schemas/collection';
  import type { collection } from '$lib/server/db/schema';

  let {
    data,
  }: {
    data: {
      collections: InferSelectModel<typeof collection>[];
      createCollectionForm: SuperValidated<Infer<CreateCollectionSchema>>;
    };
  } = $props();

  let isOpen = $state(false);

  // svelte-ignore state_referenced_locally
  const { form, errors, constraints, enhance, submitting } = superForm(data.createCollectionForm, {
    validators: zod4(createCollectionSchema),
    onResult({ result }) {
      if (result.type === 'redirect') {
        isOpen = false;
      }
    },
  });

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
</script>

<Sidebar.Root variant="floating" collapsible="icon">
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton tooltipContent="Markzen">
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
      <Sidebar.GroupAction onclick={() => (isOpen = true)}>
        <Plus />
        <span class="sr-only">Create Collection</span>
      </Sidebar.GroupAction>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each data.collections as collection (collection.id)}
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
        <Sidebar.MenuButton variant="outline" tooltipContent="Add Bookmark">
          <Plus />
          Add Bookmark
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create Collection</Dialog.Title>
      <Dialog.Description>Create a new collection to organize your bookmarks.</Dialog.Description>
    </Dialog.Header>
    <form id="collection-form" action="/collection/create" method="POST" use:enhance>
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="name">Name</Field.Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="UI Inspiration"
              aria-invalid={$errors.name ? 'true' : undefined}
              bind:value={$form.name}
              {...$constraints.name} />
            {#if $errors.name}
              <Field.FieldError>{$errors.name}</Field.FieldError>
            {:else}
              <Field.Description>
                A clear and recognizable name for this collection.
              </Field.Description>
            {/if}
          </Field.Field>
          <Field.Field>
            <Field.Label for="description">Description</Field.Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Optional notes about this collection"
              aria-invalid={$errors.description ? 'true' : undefined}
              bind:value={$form.description}
              {...$constraints.description} />
            {#if $errors.description}
              <Field.FieldError>{$errors.description}</Field.FieldError>
            {:else}
              <Field.Description>
                Optional context to help you remember what this collection is for.
              </Field.Description>
            {/if}
          </Field.Field>
        </Field.Group>
      </Field.Set>
    </form>
    <Dialog.Footer>
      <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
      <Button type="submit" form="collection-form" disabled={$submitting}>
        {#if $submitting}
          <Spinner />
        {/if}
        Create Collection
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
