<script lang="ts">
  let { children } = $props();
</script>

<div class="container">
  <main class="flex min-h-dvh items-center justify-center">
    {@render children()}
  </main>
</div>
