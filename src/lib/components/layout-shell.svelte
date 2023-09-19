<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  export let heading: string;
  export let text: string;
</script>

<div class="flex items-center justify-between">
  <div class="grid gap-1">
    <h1 class="font-bold text-2xl tracking-tight md:text-4xl">{heading}</h1>
    <p class="text-muted-foreground">{text}</p>
  </div>
  <slot name="action" />
</div>

<Separator class="my-6" />

<slot name="content" />
