<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="container space-y-6 p-10 pb-16">
  <div class="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
    <aside class="hidden md:-mx-4 md:w-1/5" />
    <div class="flex-1 md:max-w-2xl">
      <div class="flex flex-col gap-4">
        <h1 class="w-full h-auto text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold">
          {$page.error?.status}
        </h1>
        <p class="text-sm flex items-center gap-x-4 flex-wrap">
          {$page.error?.message}
        </p>
      </div>
    </div>
  </div>
</div>
