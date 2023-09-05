<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
  import { SidebarOpen } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as siteConfig from "$lib/config/site";
  import { Icons } from "./icons";
  import MobileLink from "./mobile-link.svelte";

  let open = false;
</script>

<Sheet.Root bind:open>
  <Sheet.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="ghost"
      class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
    >
      <SidebarOpen class="h-6 w-6" />
      <span class="sr-only">Toggle Menu</span>
      <span class="inline-block font-bold ml-2">Meny</span>
    </Button>
  </Sheet.Trigger>
  <Sheet.Content side="left" class="pt-12 pr-0 w-4/5">
    <MobileLink href="/" class="flex items-center" {open}>
      <Icons.logo class="mr-2 h-4 w-4" />
      <span class="font-bold">{siteConfig.name}</span>
    </MobileLink>
    <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
      <div class="flex flex-col space-y-3">
        {#each siteConfig.mainNav as navItem, index (navItem + index.toString())}
          {#if navItem.href}
            <MobileLink href={navItem.href} bind:open>
              {navItem.title}
            </MobileLink>
          {/if}
        {/each}
      </div>
    </div>
  </Sheet.Content>
</Sheet.Root>
