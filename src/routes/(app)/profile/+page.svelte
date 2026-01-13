<script lang="ts">
  import { LogOut } from '@lucide/svelte';
  import { APIError } from 'better-auth/api';
  import { toast } from 'svelte-sonner';

  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { auth } from '$lib/auth/client';
  import { Button } from '$lib/components/ui/button';
  import { Spinner } from '$lib/components/ui/spinner';

  let isLoading = $state(false);

  async function handleSignOut() {
    isLoading = true;

    try {
      await auth.signOut();

      return goto(resolve('/sign-in'));
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="mx-auto max-w-3xl">
  <div class="flex items-center justify-between gap-4">
    <div>
      <h1>Profile</h1>
      <p>Update your basic account information and settings.</p>
    </div>
    <Button variant="destructive" disabled={isLoading} onclick={handleSignOut}>
      {#if isLoading}
        <Spinner />
      {:else}
        <LogOut />
      {/if}
      Sign out
    </Button>
  </div>
</section>
