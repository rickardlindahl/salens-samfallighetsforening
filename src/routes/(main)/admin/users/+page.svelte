<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { profiles } = data;
</script>

<LayoutShell heading="Användare" text="Hantera användare.">
  <div slot="content">
    <Table.Root>
      <Table.Caption>En lista över alla registrerade användare.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Namn</Table.Head>
          <Table.Head>Epost</Table.Head>
          <Table.Head>Roll</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each profiles as profile}
          <Table.Row>
            <Table.Cell class="font-medium">{profile.full_name}</Table.Cell>
            <Table.Cell>{profile.email}</Table.Cell>
            <Table.Cell>{profile.role === "admin" ? "Administratör" : "Användare"}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</LayoutShell>
