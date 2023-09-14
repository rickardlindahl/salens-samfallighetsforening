<script lang="ts">
  import { formatRelative } from "$lib/date";
  import { formatFileSize } from "$lib/utils";
  import DashboardShell from "../dashboard/(components)/dashboard-shell.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let { documents } = data;

  $: ({ documents } = data);
</script>

<DashboardShell heading="Dokument" text="Här visas alla dokument som laddats upp.">
  <main slot="content">
    {#if documents.length > 0}
      <div class="divide-y divide-border rounded-md border">
        {#each documents as doc}
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
    {:else}
      <p>Inga dokument uppladdade än.</p>
    {/if}
  </main>
</DashboardShell>
