<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import { Button } from '$lib/components/ui/button';
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import { Spinner } from '$lib/components/ui/spinner';
  import { updateProfileSchema } from '$lib/schemas/profile';

  let { data } = $props();

  // svelte-ignore state_referenced_locally
  const { form, errors, constraints, submitting, enhance } = superForm(data.form, {
    validators: zod4(updateProfileSchema),
  });
</script>

<section class="mx-auto flex max-w-3xl flex-col gap-14">
  <div>
    <h1>Profile</h1>
    <p class="text-muted-foreground">Manage your account settings.</p>
  </div>
  <form method="POST" use:enhance>
    <Field.Set>
      <Field.Group>
        <Field.Field orientation="responsive">
          <Field.Content>
            <Field.Label for="name">Display Name</Field.Label>
            {#if $errors.name}
              <Field.FieldError>{$errors.name}</Field.FieldError>
            {:else}
              <Field.Description>Your display name.</Field.Description>
            {/if}
          </Field.Content>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            class="min-w-xs"
            aria-invalid={$errors.name ? 'true' : undefined}
            bind:value={$form.name}
            {...$constraints.name} />
          <Button type="submit" variant="outline" disabled={$submitting}>
            {#if $submitting}
              <Spinner />
            {/if}
            Save
          </Button>
        </Field.Field>
        <Field.Field orientation="responsive">
          <Field.Content>
            <Field.Label for="email">Email</Field.Label>
            <Field.Description>Your email can't be changed.</Field.Description>
          </Field.Content>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            disabled
            class="min-w-xs"
            value={data.session?.user.email} />
        </Field.Field>
      </Field.Group>
    </Field.Set>
  </form>
</section>
