<script lang="ts">
  import type { PageData } from "./$types";
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import ProfileSettingsForm from "./profile-settings-form.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Hantera dina kontoinställningar | Salens Samfällighetsförening</title>
</svelte:head>

<LayoutShell heading="Inställningar" text="Hantera dina kontoinställningar.">
  <ProfileSettingsForm slot="content" form={data.form} />
</LayoutShell>
