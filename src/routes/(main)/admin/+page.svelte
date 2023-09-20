<script lang="ts">
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let { profiles } = data;
</script>

<LayoutShell heading="Översikt" text="Administratörsverktyg.">
  <div slot="content">
    <p>Antal registrerade användare: {profiles?.length ?? 0}</p>
  </div>
</LayoutShell>
