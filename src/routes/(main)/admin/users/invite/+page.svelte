<script lang="ts">
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import type { PageData } from "./$types";
  import InviteUserForm from "./invite-user-form.svelte";

  export let data: PageData;

  let { form, houses } = data;
  $: ({ form, houses } = data);
</script>

<LayoutShell
  heading="Bjud in användare"
  text="Bjud in en ny användare till samfällighetens hemsida."
>
  <div slot="content">
    <InviteUserForm {form} {houses} />
  </div>
</LayoutShell>
