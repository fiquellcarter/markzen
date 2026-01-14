<script lang="ts">
  import { Folders, GalleryVerticalEnd, Inbox, LoaderPinwheel, Plus } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import { resolve } from '$app/paths';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import * as Sidebar from '$lib/components/ui/sidebar';
  import { Spinner } from '$lib/components/ui/spinner';
  import { Textarea } from '$lib/components/ui/textarea';
  import { createCollectionSchema, type CreateCollectionSchema } from '$lib/schemas/collection';

  let {
    data,
  }: {
    data: {
      createCollectionForm: SuperValidated<Infer<CreateCollectionSchema>>;
    };
  } = $props();

  let isCreateCollectionOpen = $state(false);

  // svelte-ignore state_referenced_locally
  const { form, errors, constraints, enhance, delayed } = superForm(data.createCollectionForm, {
    validators: zod4(createCollectionSchema),
    onUpdated: ({ form }) => {
      if (!form.message) {
        return;
      }

      toast[form.message.type === 'error' ? 'error' : 'success'](form.message.text);

      if (form.message.type === 'success') {
        isCreateCollectionOpen = false;
      }
    },
  });

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
      <Sidebar.GroupLabel>Collections</Sidebar.GroupLabel>
      <Sidebar.GroupAction onclick={() => (isCreateCollectionOpen = true)}>
        <Plus />
        <span class="sr-only">New Collection</span>
      </Sidebar.GroupAction>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each collections as collection (collection.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton tooltipContent={collection.title}>
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
        <Sidebar.MenuButton variant="outline" tooltipContent="Add Bookmark">
          <Plus />
          Add Bookmark
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>

<Dialog.Root bind:open={isCreateCollectionOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>New Collection</Dialog.Title>
      <Dialog.Description>Create a new collection to organize your items.</Dialog.Description>
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
              placeholder="Design ideas"
              aria-invalid={$errors.name ? 'true' : undefined}
              bind:value={$form.name}
              {...$constraints.name} />
            {#if $errors.name}
              <Field.FieldError>{$errors.name}</Field.FieldError>
            {:else}
              <Field.Description>A short name to identify this collection.</Field.Description>
            {/if}
          </Field.Field>
          <Field.Field>
            <Field.Label for="description">Description</Field.Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Optional description"
              aria-invalid={$errors.description ? 'true' : undefined}
              bind:value={$form.description}
              {...$constraints.description} />
            {#if $errors.description}
              <Field.FieldError>{$errors.description}</Field.FieldError>
            {:else}
              <Field.Description>Optional notes about this collection.</Field.Description>
            {/if}
          </Field.Field>
        </Field.Group>
      </Field.Set>
    </form>
    <Dialog.Footer>
      <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
      <Button type="submit" form="collection-form" disabled={$delayed}>
        {#if $delayed}
          <Spinner />
        {/if}
        Create
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
