<script lang="ts">
  import { dev } from "$app/environment";
  import SiteFooter from "$lib/components/site-footer.svelte";
  import SiteHeader from "$lib/components/site-header.svelte";
  import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
  let { supabase, session, profile } = data;
  $: ({ supabase, session, profile } = data);
</script>

<svelte:head>
  <title>Salens Samfällighetsförening</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
  <SiteHeader {profile} {supabase} />
  <main class="flex-1">
    <slot />
  </main>
  <SiteFooter />
  {#if dev}
    <TailwindIndicator />
  {/if}
</div>
