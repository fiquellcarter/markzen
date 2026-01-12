<script lang="ts">
  let { data } = $props();
</script>

<section>
  <p>Hi, {data.session.user.name || 'Losers'}!</p>
</section>
