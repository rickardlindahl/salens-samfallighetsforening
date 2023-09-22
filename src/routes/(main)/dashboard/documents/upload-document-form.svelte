<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import type { SuperValidated } from "sveltekit-superforms";
  import { uploadDocumentSchema, type UploadDocumentSchema } from "$lib/schema";
  import type { FormOptions, SubmitFunction } from "formsnap";
  import { addToast } from "$lib/components/toast/store";
  import { Icons } from "$lib/components/icons";

  export let form: SuperValidated<UploadDocumentSchema>;

  const options: FormOptions<UploadDocumentSchema> = {
    resetForm: true,
    onResult: ({ result }) => {
      addToast(
        result.type === "success"
          ? {
              type: "success",
              message: "Dokumentet har laddats upp!",
            }
          : { type: "error", message: "Misslyckades att ladda upp dokumentet!" },
      );
    },
    onError: () => {
      addToast({ type: "error", message: "Misslyckades att ladda upp dokumentet!" });
    },
  };
</script>

<Form.Root
  action="?/uploadDocument"
  method="post"
  {form}
  schema={uploadDocumentSchema}
  let:config
  let:delayed
  enctype="multipart/form-data"
  class="grid gap-y-2 py-4"
  {options}
>
  <Form.Field {config} name="description">
    <Form.Item>
      <Form.Label>Beskrivning</Form.Label>
      <Form.Input />
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="file">
    <Form.Item>
      <Form.Label>Fil</Form.Label>
      <Form.Input type="file" />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Button disabled={delayed} class="flex gap-2 items-center">
    {#if delayed}
      <Icons.spinner class="w-4 h-4 animate-spin" />Laddar upp
    {:else}
      Ladda upp
    {/if}
  </Form.Button>
</Form.Root>
