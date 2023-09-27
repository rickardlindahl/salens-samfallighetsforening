<script lang="ts">
  import { page } from "$app/stores";
  import { dev } from "$app/environment";
  import SiteFooter from "$lib/components/site-footer.svelte";
  import SiteHeader from "$lib/components/site-header.svelte";
  import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
  let { profile } = data;
  $: ({ profile } = data);
</script>

<div class="flex min-h-screen flex-col">
  <SiteHeader {profile} />
  <main class="flex-1">
    <section class="space-y-6 py-6 md:py-8">
      <div class="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 class="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {#if $page.error?.message === "Not Found"}
            404 - Sidan finns ej
          {:else}
            Något gick fel. Var god försök igen senare.
          {/if}
        </h1>
      </div>
    </section>
  </main>
  <SiteFooter />
  {#if dev}
    <TailwindIndicator />
  {/if}
</div>
