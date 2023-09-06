<script lang="ts">
  import DashboardShell from "./(components)/dashboard-shell.svelte";
</script>

<DashboardShell heading="Översikt" text="En översikt över de senaste händelserna.">
  <div slot="content" class="flex flex-col gap-4 md:flex-row">
    <div>
      <p>Senaste inläggen</p>
    </div>
    <div>
      <p>Senaste dokumenten</p>
    </div>
  </div>
</DashboardShell>
