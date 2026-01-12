<script lang="ts">
  import { LogOut } from '@lucide/svelte';
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
      const { error } = await auth.signOut();

      if (error) {
        toast.error(error.message!);
        return;
      }

      return goto(resolve('/sign-in'));
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
    }
  }
</script>

<section>
  <Button variant="destructive" disabled={isLoading} onclick={handleSignOut}>
    {#if isLoading}
      <Spinner />
    {:else}
      <LogOut />
    {/if}
    Sign out
  </Button>
</section>
