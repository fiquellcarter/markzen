<script lang="ts">
  import { LogOut, Moon, Sun, UserCog } from '@lucide/svelte';
  import { APIError } from 'better-auth/api';
  import { toggleMode } from 'mode-watcher';
  import { charAt, toUpperCase } from 'string-ts';
  import { toast } from 'svelte-sonner';

  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { auth } from '$lib/auth/client';
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Sidebar from '$lib/components/ui/sidebar';
  import { Spinner } from '$lib/components/ui/spinner';
  import { delay } from '$lib/utils';

  let { data, children } = $props();

  let isSignOut = $state(false);

  async function handleSignOut() {
    isSignOut = true;

    await delay();

    try {
      const { error } = await auth.signOut();

      if (error) {
        toast.error('Could not sign out');

        return;
      }

      await goto(resolve('/'));
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      isSignOut = false;
    }
  }
</script>

<Sidebar.Provider style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;">
  <AppSidebar
    collections={data.collections}
    createCollectionForm={data.createCollectionForm}
    createBookmarkForm={data.createBookmarkForm} />
  <div class="container">
    <div class="flex min-h-12 w-full items-center py-2">
      <div class="inline-flex w-1/2 items-center justify-start">
        <Sidebar.Trigger />
      </div>
      <div class="inline-flex w-1/2 items-center justify-end gap-2">
        <Button variant="outline" size="icon" onclick={toggleMode}>
          <Sun class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
          <Moon class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
          <span class="sr-only">Toggle Theme</span>
        </Button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Button variant="outline" {...props}>
                {data.session.user.name}
                <Avatar.Root class="size-5">
                  <Avatar.Image src={data.session.user.image} alt={data.session.user.name} />
                  <Avatar.Fallback>
                    {toUpperCase(charAt(data.session.user.name, 0))}
                  </Avatar.Fallback>
                </Avatar.Root>
              </Button>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" class="w-64">
            <DropdownMenu.Group>
              <DropdownMenu.Label>
                <p class="mb-0.5 text-[10px] font-normal text-muted-foreground">Signed in as</p>
                <p>{data.session.user.name}</p>
                <p class="text-xs font-medium text-muted-foreground">{data.session.user.email}</p>
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onclick={async () => await goto(resolve('/profile'))}>
                <UserCog />
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item variant="destructive" disabled={isSignOut} onclick={handleSignOut}>
                {#if isSignOut}
                  <Spinner />
                {:else}
                  <LogOut />
                {/if}
                Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
    <div class="typography py-4">
      {@render children()}
    </div>
  </div>
</Sidebar.Provider>
