<script lang="ts">
  import { enhance } from "$app/forms";
  import { Icons } from "$lib/components/icons";
  import TipTap from "$lib/components/tip-tap.svelte";
  import { formatRelative } from "$lib/date";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { cn } from "$lib/utils";
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { PageData } from "./$types";

  let isSaving = false;
  export let data: PageData;

  let { post } = data;

  const handleSubmit: SubmitFunction = () => {
    isSaving = true;
    return async ({ update }) => {
      isSaving = false;
      update({ reset: false });
    };
  };

  $: ({ post } = data);
  let bodyString: string;
  $: if (post.body) {
    bodyString = JSON.stringify(post.body);
  }
</script>

<form action="?/save" method="post" use:enhance={handleSubmit}>
  <input type="hidden" name="publishDate" id="publishDate" bind:value={post.publish_date} />
  <input type="hidden" name="body" id="body" bind:value={bodyString} />
  <input type="hidden" name="draft" id="draft" bind:value={post.draft} />

  <div class="grid w-full gap-10">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center space-x-10">
        <a href="/dashboard/posts" class={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.arrowLeft class="mr-2 h-4 w-4" />
          Back
        </a>
      </div>

      <div>
        <Button type="submit">
          {#if isSaving}
            <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
          {:else}
            <Icons.save class="mr-2 h-4 w-4" />
          {/if}
          {#if post.draft}
            Spara
          {:else}
            Uppdatera
          {/if}
        </Button>

        {#if post.draft}
          <Button type="submit" formaction="?/publish">
            {#if isSaving}
              <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
            {:else}
              <Icons.publish class="mr-2 h-4 w-4" />
            {/if}
            <span>Publicera</span>
          </Button>
        {:else}
          <Button type="submit" formaction="?/unpublish">
            {#if isSaving}
              <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
            {:else}
              <Icons.unpublish class="mr-2 h-4 w-4" />
            {/if}
            <span>Avpublicera</span>
          </Button>
        {/if}
      </div>
    </div>
    <div class="grid gap-8 prose prose-stone mx-auto max-w-[800px] dark:prose-invert">
      <p class="text-md text-muted-foreground">
        {#if post.draft}
          Utkast
        {:else}
          Publicerad: {formatRelative(new Date(post.publish_date ?? ""))}
        {/if}
        {#if post.updated_at}
          <br />
          Uppdaterad: {formatRelative(new Date(post.updated_at))}
        {/if}
      </p>
      <Input
        autofocus
        id="title"
        name="title"
        bind:value={post.title}
        placeholder="Ange en rubrik"
        class="w-full h-auto resize-none appearance-none overflow-hidden bg-transparent text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold focus:outline-none"
      />
      <div>
        <TipTap bind:body={post.body} />
      </div>
    </div>
  </div>
</form>
