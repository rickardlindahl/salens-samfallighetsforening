<script lang="ts">
  import { addToast } from "$lib/components/toast/store";
  import { profileSettingsFormSchema, type ProfileSettingsFormSchema } from "$lib/schema";
  import * as Form from "$lib/components/ui/form";
  import type { FormOptions, SuperValidated } from "formsnap";

  export let form: SuperValidated<ProfileSettingsFormSchema>;

  const options: FormOptions<ProfileSettingsFormSchema> = {
    resetForm: false,
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
  <fieldset class="space-y-2 mb-4">
    <legend class="text-xl font-bold mb-2">Profil</legend>
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
  </fieldset>

  <fieldset class="space-y-2">
    <legend class="text-xl font-bold mb-2">Epost-meddelanden</legend>

    <Form.Field {config} name="enable_notification_email_new_posts">
      <Form.Item>
        <div class="flex gap-2 items-center">
          <Form.Label>Nya inlägg</Form.Label>
          <Form.Checkbox />
        </div>
        <Form.Description class="text-[0.8rem] text-muted-foreground">
          Välj om du vill få ett epost-meddelande när ett nytt inlägg har publicerats på hemsidan.
        </Form.Description>
        <Form.Validation />
      </Form.Item>
    </Form.Field>

    <Form.Field {config} name="enable_notification_email_new_documents">
      <Form.Item>
        <div class="flex gap-2 items-center">
          <Form.Label>Nya dokument</Form.Label>
          <Form.Checkbox />
        </div>
        <Form.Description class="text-[0.8rem] text-muted-foreground">
          Välj om du vill få ett epost-meddelande när ett nytt dokument har laddats upp på hemsidan.
        </Form.Description>
        <Form.Validation />
      </Form.Item>
    </Form.Field>
  </fieldset>

  <Form.Item class="mt-4">
    <Form.Button disabled={delayed}>Spara inställningar</Form.Button>
  </Form.Item>
</Form.Root>
