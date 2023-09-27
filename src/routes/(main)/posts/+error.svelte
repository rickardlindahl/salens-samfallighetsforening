<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="flex flex-col gap-4">
  <h1 class="w-full h-auto text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold">
    {$page.error?.status}
  </h1>
  <p class="text-sm flex items-center gap-x-4 flex-wrap">
    {$page.error?.message}
  </p>
</div>
