<script lang="ts">
  import { page } from "$app/stores";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import { sidebarNavItems } from "$lib/config/dashboard";
  import * as Alert from "$lib/components/ui/alert";
  import { Icons } from "$lib/components/icons";

  let message: string;
  $: message = $page.url.searchParams.get("message") ?? "";
</script>

<div class="container space-y-6 p-10 pb-16">
  {#if message}
    <Alert.Root variant="destructive">
      <Icons.alert class="h-4 w-4" />
      <Alert.Title>Ej behörig</Alert.Title>
      <Alert.Description>
        {message}
      </Alert.Description>
    </Alert.Root>
  {/if}
  <div class="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
    <aside class="md:-mx-4 md:w-1/5">
      <nav class="flex flex-wrap space-x-2 md:flex-col md:space-x-0 md:space-y-1">
        {#each sidebarNavItems as item}
          <Button
            href={item.href}
            variant="ghost"
            class={cn(
              $page.url.pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
            )}
          >
            {item.title}
          </Button>
        {/each}
      </nav>
    </aside>
    <div class="flex-1 md:max-w-2xl">
      <slot />
    </div>
  </div>
</div>
