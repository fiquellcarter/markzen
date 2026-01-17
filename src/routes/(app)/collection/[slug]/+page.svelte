<script lang="ts">
  import { LayoutGrid, LayoutList, Settings2 } from '@lucide/svelte';
  import type { InferSelectModel } from 'drizzle-orm';
  import { toast } from 'svelte-sonner';
  import { getFlash } from 'sveltekit-flash-message';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import { page } from '$app/state';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as ButtonGroup from '$lib/components/ui/button-group';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { Spinner } from '$lib/components/ui/spinner';
  import { Textarea } from '$lib/components/ui/textarea';
  import {
    deleteCollectionSchema,
    updateCollectionSchema,
    type DeleteCollectionSchema,
    type UpdateCollectionSchema,
  } from '$lib/schemas/collection';
  import type { collection } from '$lib/server/db/schema';

  let {
    data,
  }: {
    data: {
      collection: InferSelectModel<typeof collection>;
      updateCollectionForm: SuperValidated<Infer<UpdateCollectionSchema>>;
      deleteCollectionForm: SuperValidated<Infer<DeleteCollectionSchema>>;
    };
  } = $props();

  let isUpdateOpen = $state(false);
  let isDeleteOpen = $state(false);

  // svelte-ignore state_referenced_locally
  const {
    form: updateForm,
    errors: updateErrors,
    constraints: updateConstraints,
    enhance: updateEnhance,
    submitting: updateSubmitting,
  } = superForm(data.updateCollectionForm, {
    validators: zod4(updateCollectionSchema),
    onResult({ result }) {
      if (result.type === 'redirect') {
        isUpdateOpen = false;
      }
    },
  });

  // svelte-ignore state_referenced_locally
  const {
    form: deleteForm,
    enhance: deleteEnhance,
    submitting: deleteSubmitting,
  } = superForm(data.deleteCollectionForm, {
    validators: zod4(deleteCollectionSchema),
    onResult({ result }) {
      if (result.type === 'redirect') {
        isDeleteOpen = false;
      }
    },
  });

  const flash = getFlash(page);

  $effect(() => {
    if (!$flash) {
      return;
    }

    toast[$flash.type]($flash.message);

    $flash = undefined;
  });
</script>

<section>
  <div class="flex items-center justify-between gap-2">
    <div>
      <h1>{data.collection.name}</h1>
      <p class="text-muted-foreground">
        {#if data.collection.description}
          <span>{data.collection.description} •</span>
        {/if}
        <span>2 saved bookmarks</span>
      </p>
    </div>
    <div class="flex flex-col-reverse items-end gap-2 sm:h-6 sm:flex-row sm:items-center">
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
      <Separator orientation="vertical" class="hidden sm:block" />
      <Dialog.Root bind:open={isUpdateOpen}>
        <Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
          <Settings2 />
          <span class="sr-only">Manage Collection</span>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit Collection</Dialog.Title>
            <Dialog.Description>Update the details or remove this collection.</Dialog.Description>
          </Dialog.Header>
          <form
            id="update-collection-form"
            action="/collection/update"
            method="POST"
            use:updateEnhance>
            <input type="hidden" name="id" bind:value={$updateForm.id} />
            <Field.Set>
              <Field.Group>
                <Field.Field>
                  <Field.Label for="name">Name</Field.Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="UI Inspiration"
                    aria-invalid={$updateErrors.name ? 'true' : undefined}
                    bind:value={$updateForm.name}
                    {...$updateConstraints.name} />
                  {#if $updateErrors.name}
                    <Field.FieldError>{$updateErrors.name}</Field.FieldError>
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
                    aria-invalid={$updateErrors.description ? 'true' : undefined}
                    bind:value={$updateForm.description}
                    {...$updateConstraints.description} />
                  {#if $updateErrors.description}
                    <Field.FieldError>{$updateErrors.description}</Field.FieldError>
                  {:else}
                    <Field.Description>
                      Optional context to help you remember what this collection is for.
                    </Field.Description>
                  {/if}
                </Field.Field>
              </Field.Group>
            </Field.Set>
          </form>
          <Dialog.Footer class="flex-col sm:justify-between">
            <div>
              <Button
                variant="destructive"
                onclick={() => ((isDeleteOpen = true), (isUpdateOpen = false))}>
                Delete Collection
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
              <Button type="submit" form="update-collection-form" disabled={$updateSubmitting}>
                {#if $updateSubmitting}
                  <Spinner />
                {/if}
                Save Changes
              </Button>
            </div>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  </div>
</section>

<AlertDialog.Root bind:open={isDeleteOpen}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>Delete this collection?</AlertDialog.Title>
      <AlertDialog.Description>
        This action is permanent. The collection and all associated bookmarks will be removed and
        cannot be recovered.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <form id="delete-collection-form" action="/collection/delete" method="POST" use:deleteEnhance>
      <input type="hidden" name="id" bind:value={$deleteForm.id} />
    </form>
    <AlertDialog.Footer>
      <AlertDialog.Cancel onclick={() => (isUpdateOpen = true)}>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        type="submit"
        form="delete-collection-form"
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
