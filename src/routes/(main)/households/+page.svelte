<script lang="ts">
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import type { PageData } from "./$types";
  import HouseholdMember from "./household-member.svelte";

  export let data: PageData;

  let { houses } = data;
  $: ({ houses } = data);
</script>

<svelte:head>
  <title>Hushåll | Salens Samfällighetsförening</title>
</svelte:head>

<LayoutShell heading="Hushåll" text="Här visas samfällighetens alla hushåll.">
  <main slot="content">
    {#if houses.length > 0}
      <div class="divide-y divide-border rounded-md border">
        {#each houses as house}
          <div class="flex items-center justify-between p-4">
            <div class="grid gap-4">
              <h2 class="text-md font-bold text-muted-foreground">
                {house.street_address}
                {house.house_number}
              </h2>
              {#each house.household_members as household_member}
                <HouseholdMember profile={household_member} />
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p>Inga dokument uppladdade än.</p>
    {/if}
  </main>
</LayoutShell>
