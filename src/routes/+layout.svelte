<script lang="ts">
  import "../app.postcss";
  import { invalidate, invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";
  import { setInitialClassState } from "$lib/components/light-switch/light-switch";
  import Toasts from "$lib/components/toast/toasts.svelte";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
      if (event === "SIGNED_OUT") {
        invalidateAll();
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

<slot />

<Toasts />
