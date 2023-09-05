<script lang="ts">
  import { page } from "$app/stores";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  let className: string | undefined | null = undefined;
  export let items: { href: string; title: string; disabled?: boolean }[];
  export { className as class };
</script>

<nav class={cn("flex space-x-2 md:flex-col md:space-x-0 md:space-y-1", className)}>
  {#each items.filter((i) => !i.disabled) as item}
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
