<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import type { SuperValidated } from "sveltekit-superforms";
  import { uploadDocumentSchema, type UploadDocumentSchema } from "./schema";
  import type { FormOptions } from "formsnap";

  export let form: SuperValidated<UploadDocumentSchema>;

  const options: FormOptions<UploadDocumentSchema> = {
    resetForm: true,
  };
</script>

<Form.Root
  action="?/uploadDocument"
  method="post"
  {form}
  schema={uploadDocumentSchema}
  let:config
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
  <Form.Button>Ladda upp</Form.Button>
</Form.Root>
