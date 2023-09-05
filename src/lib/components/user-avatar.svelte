<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { Icons } from "$lib/components/icons";

  export let image: string | undefined = undefined;
  export let name: string | undefined = undefined;
</script>

<Avatar.Root>
  {#if image}
    <Avatar.Image alt="Picture" src={image} />
  {:else}
    <Avatar.Fallback>
      <span class="sr-only">{name}</span>
      <Icons.user class="h-4 w-4" />
    </Avatar.Fallback>
  {/if}
</Avatar.Root>
