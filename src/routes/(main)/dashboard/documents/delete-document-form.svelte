<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import type { SuperValidated } from "sveltekit-superforms";
  import { deleteDocumentSchema, type DeleteDocumentSchema } from "./schema";
  import { Icons } from "$lib/components/icons";
  import DocumentIdInput from "./document-id-input.svelte";

  export let form: SuperValidated<DeleteDocumentSchema>;
  export let documentId: string;
</script>

<Form.Root
  action="?/deleteDocument"
  method="post"
  {form}
  schema={deleteDocumentSchema}
  let:config
  options={{ id: `delete-form-${documentId}` }}
>
  <Form.Field {config} name="documentId" let:setValue>
    <Form.Item>
      <DocumentIdInput {setValue} {documentId} />
      <Form.Input type="hidden" value={documentId} />
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Button type="submit">
    <Icons.delete class="h-4 w-4 mr-2" />
    <span class="hidden sm:inline-block">Ta bort</span>
  </Form.Button>
</Form.Root>
