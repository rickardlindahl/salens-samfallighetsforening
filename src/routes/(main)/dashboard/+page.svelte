<script lang="ts">
  import { formatRelative } from "$lib/date";
  import type { PageData } from "./$types";
  import DashboardShell from "./(components)/dashboard-shell.svelte";

  export let data: PageData;
  let { posts } = data;

  let documents: string[] = [];

  $: ({ posts } = data);
</script>

<DashboardShell heading="Översikt" text="En översikt över de senaste händelserna.">
  <div slot="content" class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <h2 class="font-bold text-2xl mb-4">Senaste inläggen</h2>
      <div class="grid gap-y-2">
        {#if posts.length > 0}
          {#each posts as post}
            <article
              class="shadow shadow-foreground/20 hover:shadow-foreground/30 p-4 hover:translate-x-1 w-full cursor-pointer transition-all rounded-md bg-foreground/5 hover:bg-foreground/10 outline outline-1 outline-foreground/10 hover:outline-foreground/20 relative justify-between gap-x-2 flex items-center"
            >
              <a href={`/posts/${post.id}`} class="absolute inset-0 z-10">
                <span class="sr-only">Läs artikeln</span>
              </a>
              <div class="flex flex-col gap-y-2">
                <div class="flex flex-col gap-2">
                  <h3 class="text-xl font-semibold tracking-tight mb-0">
                    {post.title}
                  </h3>
                  {#if post.publish_date}
                    <span class="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                      <time>{formatRelative(new Date(post.publish_date))}</time>
                      {#if post.profile.full_name}
                        <p>{post.profile.full_name}</p>
                      {:else}
                        <p>{post.profile.email}</p>
                      {/if}
                    </span>
                  {/if}
                </div>
              </div>
            </article>
          {/each}
        {:else}
          <p>Inga inlägg publicerade.</p>
        {/if}
      </div>
    </div>
    <div>
      <h2 class="font-bold text-2xl mb-4">Senaste dokumenten</h2>

      <div class="grid gap-y-2">
        {#if documents.length > 0}
          {#each documents as doc}
            <div>{doc}</div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</DashboardShell>
