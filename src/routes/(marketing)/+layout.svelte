<script lang="ts">
  import Footer from '$lib/components/marketing/footer.svelte';
  import Header from '$lib/components/marketing/header.svelte';

  let { children } = $props();
</script>

<div class="marketing-typography">
  <Header />
  <main>
    {@render children()}
  </main>
  <Footer />
</div>
