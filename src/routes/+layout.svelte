<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import { deepMerge, MetaTags } from 'svelte-meta-tags';

  import { page } from '$app/state';
  import { Toaster } from '$lib/components/ui/sonner';

  import './layout.css';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-1LB1BBEE19"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'G-1LB1BBEE19');
  </script>
</svelte:head>

<MetaTags {...metaTags} />
<ModeWatcher defaultMode="dark" />
<Toaster position="top-center" />

{@render children()}
