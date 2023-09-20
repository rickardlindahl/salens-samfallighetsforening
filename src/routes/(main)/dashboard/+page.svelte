<script lang="ts">
  import * as Alert from "$lib/components/ui/alert";
  import { Icons } from "$lib/components/icons";
  import { formatRelative } from "$lib/date";
  import { formatFileSize } from "$lib/utils";
  import type { PageData } from "./$types";
  import LayoutShell from "$lib/components/layout-shell.svelte";

  export let data: PageData;
  let { posts, documents } = data;

  $: ({ posts, documents } = data);
</script>

<LayoutShell heading="Översikt" text="En översikt över de senaste händelserna.">
  <div slot="content" class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <h2 class="font-bold text-2xl mb-4">Senaste inläggen</h2>
      <div class="grid gap-y-2">
        {#if posts.error}
          <Alert.Root variant="destructive">
            <Icons.alert class="h-4 w-4" />
            <Alert.Title>Fel</Alert.Title>
            <Alert.Description>
              {posts.error}
            </Alert.Description>
          </Alert.Root>
        {:else if posts.data.length === 0}
          <p>Inga inlägg publicerade.</p>
        {:else}
          {#each posts.data as post}
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
                      <time>{formatRelative(new Date(post.publish_date))}</time> ·
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
        {/if}
      </div>
    </div>
    <div>
      <h2 class="font-bold text-2xl mb-4">Senaste dokumenten</h2>
      <div class="grid gap-y-2">
        {#if documents.error}
          <Alert.Root variant="destructive">
            <Icons.alert class="h-4 w-4" />
            <Alert.Title>Fel</Alert.Title>
            <Alert.Description>
              {documents.error}
            </Alert.Description>
          </Alert.Root>
        {:else if documents.data.length === 0}
          <p>Inga dokument uppladdade.</p>
        {:else}
          <div class="divide-y divide-border rounded-md border">
            {#each documents.data as doc}
              <div class="flex items-center justify-between p-4">
                <div class="grid gap-1">
                  <a
                    class="font-semibold hover:underline"
                    download={doc.file_name}
                    href={`/documents/${doc.id}`}>{doc.description}</a
                  >
                  <div>
                    <p class="text-sm text-muted-foreground">
                      Uppladdad: {formatRelative(new Date(doc.created_at))} · {formatFileSize(
                        doc.file_size,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</LayoutShell>
