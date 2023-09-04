<script lang="ts">
  import "../app.postcss";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import SiteFooter from "$lib/components/site-footer.svelte";
  import SiteHeader from "$lib/components/site-header.svelte";
  import { setInitialClassState } from "$lib/components/light-switch/light-switch";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>Salens Samfällighetsförening</title>
  <!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
  {@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<div class="flex min-h-screen flex-col">
  <SiteHeader />
  <main class="flex-1">
    <slot />
  </main>
  <SiteFooter />
</div>
