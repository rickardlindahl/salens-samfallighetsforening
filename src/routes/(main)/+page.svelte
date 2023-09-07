<script lang="ts">
  import * as siteConfig from "$lib/config/site";
  import type { PageData } from "./$types";

  import { cn } from "$lib/utils";
  import { buttonVariants } from "$lib/components/ui/button";

  export let data: PageData;
  let { session, profile } = data;
  $: ({ session, profile } = data);
</script>

<section class="space-y-6 py-6 md:py-8">
  <div class="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
    <h1 class="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
      {siteConfig.name}
    </h1>
    <p class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      {siteConfig.description}
    </p>
    <div class="space-x-4">
      {#if profile}
        <p>Inloggad som {profile.full_name ?? profile.email}</p>
      {:else}
        <a href="/login" class={cn(buttonVariants({ size: "lg" }))}>Kom igång</a>
      {/if}
    </div>
  </div>
</section>

<section id="features" class="container space-y-6 bg-slate-50 py-6 dark:bg-transparent md:py-8">
  <div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
    <h2 class="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Innehåll</h2>
    <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
      Som medlem i föreningen kan du ta del av inlägg från samfälligheten, ladda ner filer (t.ex.
      protokoll från styrelsemöten) samt hitta kontaktuppgifter till medlemmar i föreningen.
    </p>
  </div>
  <div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
    {#each siteConfig.mainNav as navItem}
      <a href={navItem.href}>
        <article
          class="shadow shadow-foreground/20 hover:shadow-foreground/30 p-4 hover:translate-x-1 w-full cursor-pointer transition-all rounded-lg bg-foreground/5 hover:bg-foreground/10 outline outline-1 outline-foreground/10 hover:outline-foreground/20 relative justify-between gap-x-2 flex items-center"
        >
          <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svelte:component this={navItem.icon} class="h-12 w-12" />
            <div class="space-y-2">
              <h3 class="font-bold">{navItem.title}</h3>
              <p class="text-sm text-muted-foreground">
                {navItem.description}
              </p>
            </div>
          </div>
        </article>
      </a>
    {/each}
  </div>
</section>
