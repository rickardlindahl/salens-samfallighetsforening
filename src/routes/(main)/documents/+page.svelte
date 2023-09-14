<script lang="ts">
  import { formatRelative } from "$lib/date";
  import DashboardShell from "../dashboard/(components)/dashboard-shell.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let { documents } = data;

  $: ({ documents } = data);
</script>

<DashboardShell heading="Dokument" text="Här visas alla dokument som laddats upp.">
  <main slot="content">
    {#if documents.length > 0}
      <div class="flex flex-col gap-4">
        {#each documents as doc}
          <article
            class="shadow shadow-foreground/20 hover:shadow-foreground/30 p-4 hover:translate-x-1 w-full cursor-pointer transition-all rounded-md bg-foreground/5 hover:bg-foreground/10 outline outline-1 outline-foreground/10 hover:outline-foreground/20 relative justify-between gap-x-2 flex items-center"
          >
            <a class="absolute inset-0 z-10" download={doc.file_name} href={`/documents/${doc.id}`}>
              <span class="sr-only">Ladda ned dokumentet</span>
            </a>
            <div class="flex flex-col gap-y-2">
              <div class="flex flex-col gap-2">
                <h2
                  class="text-xl sm:text-xl md:text-2xl xl:text-3xl font-semibold tracking-tight mb-0"
                >
                  {doc.description}
                </h2>
                {#if doc.created_at}
                  <span class="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                    <time>{formatRelative(new Date(doc.created_at))}</time>
                    {#if doc.profile.full_name}
                      <p>{doc.profile.full_name}</p>
                    {:else}
                      <p>{doc.profile.email}</p>
                    {/if}
                  </span>
                {/if}
              </div>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <p>Inga dokument uppladdade.</p>
    {/if}
  </main>
</DashboardShell>
