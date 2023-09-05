<script lang="ts">
  import { Icons } from "$lib/components/icons";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { cn } from "$lib/utils";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { createEventDispatcher } from "svelte";

  export let url: string;
  export let supabase: SupabaseClient;

  let avatarUrl: string | null = null;
  let uploading = false;
  let files: FileList;

  const dispatch = createEventDispatcher();

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

  const uploadAvatar = async () => {
    try {
      uploading = true;

      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      let { error } = await supabase.storage.from("avatars").upload(filePath, file);

      if (error) {
        throw error;
      }

      url = filePath;
      setTimeout(() => {
        dispatch("upload");
      }, 100);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      uploading = false;
    }
  };

  function removeAvatar() {
    avatarUrl = "";
    url = "";
  }

  $: if (url) downloadImage(url);
</script>

<div>
  <div class="h-32 w-32 mb-4">
    {#if avatarUrl}
      <img src={avatarUrl} class="rounded-2xl object-fit" alt="User avatar" />
    {:else}
      <Icons.user class="rounded-2xl w-full h-full" />
    {/if}
  </div>
  <input type="hidden" name="avatarUrl" value={url} />

  <div class="flex flex-row">
    <div>
      <Label class={cn(buttonVariants(), "cursor-pointer")} for="single">
        {uploading ? "Laddar upp ..." : "Ladda upp bild"}
      </Label>
      <input
        style="visibility: hidden; position:absolute;"
        type="file"
        id="single"
        accept="image/*"
        bind:files
        on:change={uploadAvatar}
        disabled={uploading}
      />
    </div>
    <div>
      <button class={cn(buttonVariants({ variant: "link" }))} on:click={removeAvatar}
        >Ta bort bild</button
      >
    </div>
  </div>
</div>
