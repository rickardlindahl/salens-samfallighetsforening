<script lang="ts">
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let { profiles } = data;
</script>

<svelte:head>
  <title>Administration | Salens Samfällighetsförening</title>
</svelte:head>

<LayoutShell heading="Översikt" text="Administration.">
  <div slot="content">
    <p>Antal registrerade användare: {profiles?.length ?? 0}</p>
  </div>
</LayoutShell>
