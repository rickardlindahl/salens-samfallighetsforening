<script lang="ts">
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import * as Accordion from "$lib/components/ui/accordion";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Icons } from "$lib/components/icons";
  import { formatRelative } from "$lib/date";
  import { formatFileSize } from "$lib/utils";
  import type { PageData } from "./$types";
  import UploadDocumentForm from "./upload-document-form.svelte";
  import { Button } from "$lib/components/ui/button";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { addToast } from "$lib/components/toast/store";

  export let data: PageData;

  let { documents, uploadForm } = data;
  $: ({ documents, uploadForm } = data);

  let isLoading = false;

  const handleDelete: SubmitFunction = ({ cancel }) => {
    if (!confirm("Är du säker på att du vill ta bort dokumentet?")) {
      return cancel();
    }

    isLoading = true;
    return async ({ update, result }) => {
      isLoading = false;

      addToast(
        result.type === "success"
          ? {
              type: "success",
              message: "Dokument borttaget!",
            }
          : {
              type: "error",
              message: "Misslyckades att ta bort dokumentet!",
            },
      );

      await update();
    };
  };
</script>

<svelte:head>
  <title>Ladda upp och hantera dokument | Salens Samfällighetsförening</title>
</svelte:head>

<LayoutShell heading="Dokument" text="Ladda upp och hantera dokument">
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

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild let:builder>
                <Button builders={[builder]} variant="outline"
                  ><Icons.more class="h-4 w-4" /></Button
                >
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <a
                    href={`/documents/${doc.id}`}
                    download={doc.file_name}
                    class="flex items-center w-full"
                  >
                    <Icons.download class="w-4 h-4 mr-2" />
                    Ladda ner
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  class="flex cursor-pointer items-center text-destructive focus:text-destructive"
                >
                  <form
                    action="?/deleteDocument"
                    method="post"
                    use:enhance={handleDelete}
                    class="w-full"
                  >
                    <input type="hidden" name="documentId" value={doc.id} />
                    <button
                      id={`delete-${doc.id}`}
                      type="submit"
                      value="Ta bort"
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
      <p>Du har inte laddat upp några dokument än.</p>
    {/if}
  </div>
</LayoutShell>
