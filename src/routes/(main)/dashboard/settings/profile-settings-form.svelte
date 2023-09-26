<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { addToast } from "$lib/components/toast/store";
  import { profileSettingsFormSchema, type ProfileSettingsFormSchema } from "$lib/schema";
  import * as Form from "$lib/components/ui/form";
  import type { FormOptions, SuperValidated } from "formsnap";

  export let form: SuperValidated<ProfileSettingsFormSchema>;

  const options: FormOptions<ProfileSettingsFormSchema> = {
    resetForm: true,
    onResult: ({ result }) => {
      addToast(
        result.type === "success"
          ? {
              type: "success",
              message: "Inställningarna har uppdaterats!",
            }
          : { type: "error", message: "Misslyckades att uppdatera inställningarna!" },
      );
    },
    onError: () => {
      addToast({ type: "error", message: "Misslyckades att uppdatera inställningarna!" });
    },
  };
</script>

<Form.Root
  action="?/update"
  method="post"
  {form}
  schema={profileSettingsFormSchema}
  let:config
  let:delayed
  class="grid gap-y-2 py-4"
  {options}
>
  <Form.Field {config} name="full_name">
    <Form.Item>
      <Form.Label placeholder="Förnamn Efternamnsson">Ditt namn</Form.Label>
      <Form.Input />
      <Form.Description class="text-[0.8rem] text-muted-foreground">
        Var god ange ditt fullständiga namn eller ett visningsnamn du känner dig bekväm med.
      </Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Item>
    <Form.Button disabled={delayed}>Spara inställningar</Form.Button>
  </Form.Item>
</Form.Root>
