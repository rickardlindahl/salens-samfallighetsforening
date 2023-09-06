<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";
  import { cn } from "$lib/utils";
  import DashboardShell from "../(components)/dashboard-shell.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Icons } from "$lib/components/icons";

  let isLoading = false;

  const handleSubmit: SubmitFunction = () => {
    isLoading = true;
    return async ({ result, update }) => {
      isLoading = false;
      console.log({ result, update });
      await update();
    };
  };
</script>

<DashboardShell heading="Inlägg" text="Skapa och hantera inlägg">
  <form slot="action" action="?/createPost" method="post" use:enhance={handleSubmit}>
    <button
      class={cn(buttonVariants(), {
        "cursor-not-allowed opacity-60": isLoading,
      })}
      disabled={isLoading}
    >
      {#if isLoading}
        <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
      {:else}
        <Icons.add class="mr-2 h-4 w-4" />
      {/if}
      <span class="hidden sm:inline-block">Nytt inlägg</span>
    </button>
  </form>

  <div slot="content" class="flex flex-col gap-4 md:flex-row">
    <p>Alla dina inlägg.</p>
  </div>
</DashboardShell>
