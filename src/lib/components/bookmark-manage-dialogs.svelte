<script lang="ts">
  import type { InferSelectModel } from 'drizzle-orm';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import { Spinner } from '$lib/components/ui/spinner';
  import { Textarea } from '$lib/components/ui/textarea';
  import {
    deleteBookmarkSchema,
    updateBookmarkSchema,
    type DeleteBookmarkSchema,
    type UpdateBookmarkSchema,
  } from '$lib/schemas/bookmark';
  import type { collection } from '$lib/server/db/schema';

  let {
    collections,
    updateBookmarkForm,
    deleteBookmarkForm,
  }: {
    collections: InferSelectModel<typeof collection>[];
    updateBookmarkForm: SuperValidated<Infer<UpdateBookmarkSchema>>;
    deleteBookmarkForm: SuperValidated<Infer<DeleteBookmarkSchema>>;
  } = $props();

  let isUpdateDialogOpen = $state(false);
  let isDeleteDialogOpen = $state(false);
  let selectedCollectionId = $state('');

  // svelte-ignore state_referenced_locally
  const {
    form: updateForm,
    errors: updateErrors,
    constraints: updateConstraints,
    submitting: updateSubmitting,
    enhance: updateEnhance,
    reset: updateReset,
  } = superForm(updateBookmarkForm, {
    id: 'update-form',
    validators: zod4(updateBookmarkSchema),
    onResult({ result }) {
      if (result.type === 'success') {
        isUpdateDialogOpen = false;
      }
    },
  });

  // svelte-ignore state_referenced_locally
  const {
    form: deleteForm,
    submitting: deleteSubmitting,
    enhance: deleteEnhance,
    reset: deleteReset,
  } = superForm(deleteBookmarkForm, {
    id: 'delete-form',
    validators: zod4(deleteBookmarkSchema),
    onResult({ result }) {
      if (result.type === 'success') {
        isDeleteDialogOpen = false;
      }
    },
  });

  export function openUpdateDialog(data: BookmarkWithHost) {
    selectedCollectionId = data.collectionId ? data.collectionId : '';

    updateReset({
      data: {
        id: data.id,
        collectionId: data.collectionId,
        url: data.url,
        title: data.title,
        description: data.description,
      },
    });

    isUpdateDialogOpen = true;
  }

  function openDeleteDialog() {
    deleteReset({
      data: {
        id: $updateForm.id,
      },
    });

    isUpdateDialogOpen = false;
    isDeleteDialogOpen = true;
  }

  const collectionsById = $derived(
    Object.fromEntries(collections.map((collection) => [collection.id, collection]))
  );

  const collectionLabel = $derived(
    selectedCollectionId
      ? (collectionsById[selectedCollectionId]?.name ?? 'Choose a collection')
      : 'Unsorted'
  );

  $effect(() => {
    $updateForm.collectionId = selectedCollectionId === '' ? null : selectedCollectionId;
  });
</script>

<Dialog.Root bind:open={isUpdateDialogOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit Bookmark</Dialog.Title>
      <Dialog.Description>Update the details or remove this bookmark.</Dialog.Description>
    </Dialog.Header>
    <form id="update-form" action="/bookmark/update" method="POST" use:updateEnhance>
      <input type="hidden" name="id" bind:value={$updateForm.id} />
      <input type="hidden" name="collectionId" bind:value={$updateForm.collectionId} />
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="url">URL</Field.Label>
            <Input
              type="url"
              id="url"
              name="url"
              placeholder="https://example.com"
              aria-invalid={$updateErrors.url ? 'true' : undefined}
              bind:value={$updateForm.url}
              {...$updateConstraints.url} />
            {#if $updateErrors.url}
              <Field.FieldError>{$updateErrors.url}</Field.FieldError>
            {:else}
              <Field.Description>The link you want to save.</Field.Description>
            {/if}
          </Field.Field>
          <Field.Field>
            <Field.Label for="title">Title</Field.Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Page title"
              aria-invalid={$updateErrors.title ? 'true' : undefined}
              bind:value={$updateForm.title}
              {...$updateConstraints.title} />
            {#if $updateErrors.title}
              <Field.FieldError>{$updateErrors.title}</Field.FieldError>
            {:else}
              <Field.Description>Give this bookmark a name.</Field.Description>
            {/if}
          </Field.Field>
          <Field.Field>
            <Field.Label for="description">Description</Field.Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add some notes (optional)"
              aria-invalid={$updateErrors.description ? 'true' : undefined}
              bind:value={$updateForm.description}
              {...$updateConstraints.description} />
            {#if $updateErrors.description}
              <Field.FieldError>{$updateErrors.description}</Field.FieldError>
            {:else}
              <Field.Description>Extra details about this link (optional).</Field.Description>
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
    <Dialog.Footer class="flex-col pt-6 sm:justify-between">
      <div>
        <Button variant="destructive" onclick={openDeleteDialog}>Delete Bookmark</Button>
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
      <AlertDialog.Title>Delete this bookmark?</AlertDialog.Title>
      <AlertDialog.Description>
        This can't be undone. The bookmark will be permanently removed.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <form id="delete-form" action="/bookmark/delete" method="POST" use:deleteEnhance>
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
        Delete Bookmark
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
