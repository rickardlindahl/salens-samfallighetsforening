<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { Icons } from "$lib/components/icons";
  import type { SupabaseClient } from "@supabase/supabase-js";

  export let image: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let supabase: SupabaseClient;

  let avatarUrl: string;

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from("avatars").download(path);

      if (error) {
        throw error;
      }

      const objectUrl = URL.createObjectURL(data);
      avatarUrl = objectUrl;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  };

  $: if (image) downloadImage(image);
</script>

<Avatar.Root>
  {#if avatarUrl}
    <Avatar.Image alt="Picture" src={avatarUrl} />
  {:else}
    <Avatar.Fallback>
      <span class="sr-only">{name}</span>
      <Icons.user class="h-4 w-4" />
    </Avatar.Fallback>
  {/if}
</Avatar.Root>
