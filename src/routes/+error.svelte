<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="container space-y-6 p-10 pb-16">
  <div class="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
    <div class="flex-1 md:max-w-2xl">
      {#if $page.error}
        <h1>{$page.error?.status} - {$page.error?.message}</h1>
      {:else}
        <h1>Något gick fel..</h1>
      {/if}
    </div>
  </div>
</div>
