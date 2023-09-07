<script lang="ts">
  import { page } from "$app/stores";
  import { Icons } from "$lib/components/icons";
  import { buttonVariants } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
</script>

<div class="container space-y-6 p-10 pb-16">
  <div class="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
    <aside class={cn($page.url.pathname === "/posts" && "hidden", "md:-mx-4 md:w-1/5")}>
      <nav class={cn("flex space-x-2 md:flex-col md:space-x-0 md:space-y-1")}>
        <a href="/posts" class={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
          ><Icons.arrowLeft class="h-4 w-4 mr-2" />
          Se alla inlägg
        </a>
      </nav>
    </aside>
    <div class="flex-1 md:max-w-2xl">
      <slot />
    </div>
  </div>
</div>
