<script lang="ts">
  import DashboardShell from "../(components)/dashboard-shell.svelte";
  import * as Accordion from "$lib/components/ui/accordion";
  import { Icons } from "$lib/components/icons";
  import { formatRelative } from "$lib/date";
  import type { PageData } from "./$types";
  import DeleteDocumentForm from "./delete-document-form.svelte";
  import UploadDocumentForm from "./upload-document-form.svelte";

  export let data: PageData;

  let { documents, deleteForm, uploadForm } = data;
  $: ({ documents, deleteForm, uploadForm } = data);
</script>

<DashboardShell heading="Dokument" text="Ladda upp och hantera dokument">
  <div slot="content" class="flex flex-col gap-4">
    <Accordion.Root class="w-full mb-4">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          <div class="flex flex-row items-center">
            <Icons.add class="mr-2 h-4 w-4" />
            Ladda upp dokument
          </div></Accordion.Trigger
        >

        <Accordion.Content>
          <UploadDocumentForm form={uploadForm} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
    {#if documents.length > 0}
      <div class="divide-y divide-border rounded-md border">
        {#each documents as doc}
          <div class="flex items-center justify-between p-4">
            <div class="grid gap-1">
              <a class="font-semibold hover:underline" href={`/documents/${doc.id}`}
                >{doc.description}</a
              >
              <div>
                <p class="text-sm text-muted-foreground">
                  Uppladdad: {formatRelative(new Date(doc.created_at))}
                </p>
              </div>
            </div>

            <DeleteDocumentForm form={deleteForm} documentId={doc.id} />
          </div>
        {/each}
      </div>
    {:else}
      <p>Du har inte laddat upp några dokument än.</p>
    {/if}
  </div>
</DashboardShell>
