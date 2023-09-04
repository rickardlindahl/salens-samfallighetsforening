<script lang="ts">
  import MainNav from "$lib/components/main-nav.svelte";
  import MobileNav from "$lib/components/mobile-nav.svelte";
  import { cn } from "$lib/utils";
  import { buttonVariants } from "./ui/button";
</script>

<header
  class="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
  <div class="container flex h-14 items-center">
    <MainNav />
    <MobileNav />
    <div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
      <div class="w-full flex-1 md:w-auto md:flex-none">
        <!-- Command Menu Here -->
      </div>
    </div>
    <nav>
      <a href="/login" class={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4")}>
        Logga in
      </a>
    </nav>
  </div>
</header>
