<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";
  import { cn } from "$lib/utils";
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Icons } from "$lib/components/icons";
  import { formatRelative } from "$lib/date";
  import type { PageData } from "./$types";
  import { addToast } from "$lib/components/toast/store";

  export let data: PageData;

  let { posts } = data;

  let isLoading = false;

  const handleSubmit: SubmitFunction = () => {
    isLoading = true;

    return async ({ update, result }) => {
      isLoading = false;

      if (result.type === "error" || result.type === "failure") {
        addToast({
          type: "error",
          message: "Misslyckades att skapa nytt inlägg. Var god försök igen!",
        });
      }

      await update();
    };
  };

  const handleDelete: SubmitFunction = ({ cancel }) => {
    if (!confirm("Är du säker på att du vill ta bort inlägget?")) {
      return cancel();
    }

    isLoading = true;
    return async ({ update, result }) => {
      isLoading = false;

      addToast(
        result.type === "success"
          ? {
              type: "success",
              message: "Inlägg borttaget!",
            }
          : {
              type: "error",
              message: "Misslyckades att ta bort inlägget!",
            },
      );

      await update();
    };
  };
  $: ({ posts } = data);
</script>

<svelte:head>
  <title>Skapa nya och hantera dina inlägg | Salens Samfällighetsförening</title>
</svelte:head>

<LayoutShell heading="Inlägg" text="Skapa nya och hantera dina inlägg">
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

  <div slot="content" class="flex flex-col gap-4">
    {#if posts.length > 0}
      <div class="divide-y divide-border rounded-md border">
        {#each posts as post}
          <div class="flex items-center justify-between p-4">
            <div class="grid gap-1">
              <a class="font-semibold hover:underline" href={`/editor/${post.id}`}>{post.title}</a>
              <div>
                <p class="text-sm text-muted-foreground">
                  {#if post.draft}
                    Utkast: {formatRelative(new Date(post.updated_at ?? ""))}
                  {:else}
                    Publicerad: {formatRelative(new Date(post.publish_date ?? ""))}
                  {/if}
                </p>
              </div>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild let:builder>
                <Button builders={[builder]} variant="outline"
                  ><Icons.more class="h-4 w-4" /></Button
                >
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <a href={`/editor/${post.id}`} class="flex w-full"> Redigera </a>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  class="flex cursor-pointer items-center text-destructive focus:text-destructive"
                >
                  <form
                    action="?/deletePost"
                    method="post"
                    use:enhance={handleDelete}
                    class="w-full"
                  >
                    <input type="hidden" name="postId" value={post.id} />
                    <button
                      id={`delete-${post.id}`}
                      type="submit"
                      disabled={isLoading}
                      class="flex items-center w-full"
                    >
                      {#if isLoading}
                        <Icons.spinner class="w-4 h-4 mr-2 animate-spin" />
                      {:else}
                        <Icons.delete class="w-4 h-4 mr-2" />
                      {/if}
                      Ta bort</button
                    >
                  </form>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        {/each}
      </div>
    {:else}
      <p>Du har inte gjort några inlägg än.</p>
    {/if}
  </div>
</LayoutShell>
