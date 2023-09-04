<script>
  import * as siteConfig from "$lib/config/site";
  import { buttonVariants } from "$lib/components/ui/button";

  import { cn } from "$lib/utils";
</script>

<section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
  <div class="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
    <h1 class="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
      {siteConfig.name}
    </h1>
    <p class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      {siteConfig.description}
    </p>
    <div class="space-x-4">
      <a href="/login" class={cn(buttonVariants({ size: "lg" }))}>Kom igång</a>
    </div>
  </div>
</section>

<section
  id="features"
  class="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
>
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
        <div class="relative overflow-hidden rounded-lg border bg-background p-2">
          <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svelte:component this={navItem.icon} class="h-12 w-12" />
            <div class="space-y-2">
              <h3 class="font-bold">{navItem.title}</h3>
              <p class="text-sm text-muted-foreground">
                {navItem.description}
              </p>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>
