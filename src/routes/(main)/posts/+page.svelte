<script lang="ts">
  import { formatRelative } from "$lib/date";
  import DashboardShell from "../dashboard/(components)/dashboard-shell.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let { posts } = data;

  $: ({ posts } = data);
</script>

<DashboardShell
  heading="Inlägg"
  text="Här visas alla inlägg som skapats av medlemmar i föreningen."
>
  <main slot="content">
    {#if posts.length > 0}
      <div class="flex flex-col gap-4">
        {#each posts as post}
          <article
            class="shadow shadow-foreground/20 hover:shadow-foreground/30 p-4 hover:translate-x-1 w-full cursor-pointer transition-all rounded-md bg-foreground/5 hover:bg-foreground/10 outline outline-1 outline-foreground/10 hover:outline-foreground/20 relative justify-between gap-x-2 flex items-center"
          >
            <a href={`/posts/${post.id}`} class="absolute inset-0 z-10">
              <span class="sr-only">Läs artikeln</span>
            </a>
            <div class="flex flex-col gap-y-2">
              <div class="flex flex-col gap-2">
                <h2
                  class="text-xl sm:text-xl md:text-2xl xl:text-3xl font-semibold tracking-tight mb-0"
                >
                  {post.title}
                </h2>
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
      </div>
    {:else}
      <p>Inga inlägg publicerade.</p>
    {/if}
  </main>
</DashboardShell>
