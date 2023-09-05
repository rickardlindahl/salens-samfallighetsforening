<script lang="ts">
  import SiteFooter from "$lib/components/site-footer.svelte";
  import SiteHeader from "$lib/components/site-header.svelte";
</script>

<svelte:head>
  <title>Salens Samfällighetsförening</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
  <SiteHeader />
  <main class="flex-1">
    <slot />
  </main>
  <SiteFooter />
</div>
