<script lang="ts">
  import { enhance } from "$app/forms";
  import { Icons } from "$lib/components/icons";
  import TipTap from "$lib/components/tip-tap.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { cn } from "$lib/utils";
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { PageData } from "./$types";
  import type { Editor, JSONContent } from "@tiptap/core";

  let isSaving = false;
  export let data: PageData;

  let { post } = data;
  $: ({ post } = data);

  const handleSubmit: SubmitFunction = () => {
    isSaving = true;
    return async () => {
      isSaving = false;
    };
  };

  let bodyString: string;
  $: if (post.body) {
    bodyString = JSON.stringify(post.body);
  }
</script>

<form action="?/save" method="post" use:enhance={handleSubmit}>
  <div class="grid w-full gap-10">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center space-x-10">
        <a href="/dashboard/posts" class={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.arrowLeft class="mr-2 h-4 w-4" />
          Back
        </a>
        <p class="text-sm text-muted-foreground">
          {#if post.published}
            Publicerad
          {:else}
            Utkast
          {/if}
        </p>
      </div>
      <button type="submit" class={cn(buttonVariants())}>
        {#if isSaving}
          <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        <span>Spara</span>
      </button>
    </div>
    <div class="grid gap-8 prose prose-stone mx-auto max-w-[800px] dark:prose-invert">
      <Input
        autofocus
        id="title"
        name="title"
        bind:value={post.title}
        placeholder="Ange en rubrik"
        class="w-full h-auto resize-none appearance-none overflow-hidden bg-transparent text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold focus:outline-none"
      />
      <input type="hidden" name="body" id="body" bind:value={bodyString} />
      <div>
        <TipTap bind:body={post.body} />
      </div>
    </div>
  </div>
</form>
