<script lang="ts">
  import { formatRelative } from "$lib/date";
  import type { PageData } from "./$types";

  export let data: PageData;
  let { posts } = data;

  $: ({ posts } = data);
</script>

<div class="container max-w-4xl py-6 lg:py-10">
  <div class="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
    <div class="flex-1 space-y-4">
      <h1 class="inline-block font-heading text-4xl tracking-tight lg:text-5xl">Inlägg</h1>
      <p class="text-xl text-muted-foreground">
        Här visas alla inlägg som skapats av medlemmar i föreningen.
      </p>
    </div>
  </div>
  <hr class="my-8" />
  {#if posts.length > 0}
    <div class="flex flex-col gap-4">
      {#each posts as post}
        <article
          class="shadow shadow-foreground/20 hover:shadow-foreground/30 p-4 hover:translate-x-1 w-full cursor-pointer transition-all rounded-md bg-foreground/5 hover:bg-foreground/10 outline outline-1 outline-foreground/10 hover:outline-foreground/20 relative justify-between gap-x-2 flex items-center"
        >
          <a href={`/posts/${post.id}`} class="absolute inset-0 z-10">
            <span class="sr-only">Läs artikel</span>
          </a>
          <div class="flex flex-col gap-y-2">
            <div class="flex flex-col gap-2">
              <h2 class="text-4xl font-bold tracking-wide mb-0">
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
    <p>No posts published.</p>
  {/if}
</div>
