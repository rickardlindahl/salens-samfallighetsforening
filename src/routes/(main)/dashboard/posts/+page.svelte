<script lang="ts">
  import { Icons } from "$lib/components/icons";
  import { Button } from "$lib/components/ui/button";
  import DashboardShell from "../(components)/dashboard-shell.svelte";
</script>

<DashboardShell heading="Inlägg" text="Skapa och hantera inlägg">
  <Button slot="action"
    ><Icons.plus /><span class="hidden sm:inline-block">Skapa inlägg</span></Button
  >

  <div slot="content" class="flex flex-col gap-4 md:flex-row">
    <p>Alla dina inlägg.</p>
  </div>
</DashboardShell>
