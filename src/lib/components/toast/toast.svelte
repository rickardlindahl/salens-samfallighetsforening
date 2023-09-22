<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { Icons } from "$lib/components/icons";
  import type { ToastType } from "./types";
  import { cn } from "$lib/utils";

  const dispatch = createEventDispatcher();

  export let type: ToastType = "info";
  export let dismissible = true;
</script>

<article
  class={cn(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all border bg-background text-foreground",
    {
      "destructive border-destructive bg-destructive text-destructive-foreground": type === "error",
    },
  )}
  role="alert"
  transition:fade
>
  <div class="text-white flex gap-2 items-center">
    {#if type === "success"}
      <Icons.success class="w-4 h-4" />
    {:else if type === "error"}
      <Icons.error class="w-4 h-4" />
    {:else}
      <Icons.info class="w-4 h-4" />
    {/if}
    <div class="text-sm opacity-90">
      <slot />
    </div>

    {#if dismissible}
      <button
        on:click={() => dispatch("dismiss")}
        class={cn(
          "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
          {
            "group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600":
              type === "error",
          },
        )}
      >
        <Icons.close class="w-4 h-4" />
      </button>
    {/if}
  </div>
</article>
