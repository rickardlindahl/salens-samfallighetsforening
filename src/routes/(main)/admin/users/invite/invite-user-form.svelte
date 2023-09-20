<script lang="ts">
  import { Form as Formsnap, type FormOptions } from "formsnap";
  import type { SuperValidated } from "sveltekit-superforms";
  import * as Form from "$lib/components/ui/form";
  import { inviteUserFormSchema, type InviteUserFormSchema } from "$lib/schema";
  import type { House } from "../../../../../types/database";

  export let form: SuperValidated<InviteUserFormSchema>;
  export let houses: House[];

  const options: FormOptions<InviteUserFormSchema> = {
    resetForm: true,
  };
</script>

<Form.Root
  action="?/inviteUser"
  method="post"
  {form}
  schema={inviteUserFormSchema}
  let:config
  class="grid gap-y-2 py-4"
  {options}
>
  <Form.Field {config} name="email">
    <Form.Item>
      <Form.Label>Epost</Form.Label>
      <Form.Input />
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="full_name">
    <Form.Item>
      <Form.Label>Namn</Form.Label>
      <Form.Input />
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Item>
    <div />
    <fieldset>
      <legend
        class="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Roll</legend
      >
      {#each [{ role: "admin", text: "Administratör" }, { role: "user", text: "Användare" }] as item, i}
        <Form.Field {config} name="role">
          <Formsnap.Radio value={item.role} />
          <Form.Label>{item.text}</Form.Label>
          {#if i === 0}
            <Form.Validation />
          {/if}
        </Form.Field>
      {/each}
    </fieldset>
  </Form.Item>

  <Form.Item>
    <div />
    <fieldset>
      <legend
        class="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Ange hushåll</legend
      >
      <div class="grid grid-cols-1 sm:grid-cols-2">
        {#each houses as house, i}
          <div>
            <Form.Field {config} name="house_id">
              <Formsnap.Radio value={house.id} />
              <Form.Label>{house.street_address} {house.house_number}</Form.Label>
              {#if i === houses.length - 1}
                <Form.Validation />
              {/if}
            </Form.Field>
          </div>
        {/each}
      </div>
    </fieldset>
  </Form.Item>

  <Form.Button>Skicka inbjudan</Form.Button>
</Form.Root>
