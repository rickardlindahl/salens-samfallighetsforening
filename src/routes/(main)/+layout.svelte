<script lang="ts">
  import { dev } from "$app/environment";
  import SiteFooter from "$lib/components/site-footer.svelte";
  import SiteHeader from "$lib/components/site-header.svelte";
  import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";

  export let data;
  let { session } = data;
  $: ({ session } = data);
</script>

<svelte:head>
  <title>Salens Samfällighetsförening</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
  <SiteHeader user={session?.user} />
  <main class="flex-1">
    <slot />
  </main>
  <SiteFooter />
  {#if dev}
    <TailwindIndicator />
  {/if}
</div>
