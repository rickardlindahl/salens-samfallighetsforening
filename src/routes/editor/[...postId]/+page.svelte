<script lang="ts">
  import { Icons } from "$lib/components/icons";
  import { formatRelative } from "$lib/date";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { cn } from "$lib/utils";
  import { postFormSchema } from "$lib/schema";
  import type { PageData } from "./$types";
  import TipTap from "$lib/components/tip-tap.svelte";

  export let data: PageData;

  let { post, form } = data;

  let bodyString: string;

  $: ({ post, form } = data);
</script>

<svelte:head>
  <title>Skriv ett inlägg | Salens Samfällighetsförening</title>
</svelte:head>

<Form.Root
  method="post"
  {form}
  schema={postFormSchema}
  let:config
  let:enhance
  let:delayed
  options={{ delayMs: 5000 }}
>
  <Form.Field {config} name="publish_date" let:value>
    <Form.Item>
      <Form.Input type="hidden" {value} />
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="draft" let:value>
    <Form.Item>
      <Form.Input type="hidden" {value} />
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <div class="grid w-full gap-10">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center space-x-10">
        <a href="/dashboard/posts" class={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.arrowLeft class="mr-2 h-4 w-4" />
          Back
        </a>
      </div>

      <div>
        <Form.Button type="submit" formaction="?/save">
          {#if delayed}
            <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
          {:else}
            <Icons.save class="mr-2 h-4 w-4" />
          {/if}
          {#if post.draft}
            Spara
          {:else}
            Uppdatera
          {/if}
        </Form.Button>

        {#if post.draft}
          <Form.Button type="submit" formaction="?/publish">
            {#if delayed}
              <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
            {:else}
              <Icons.publish class="mr-2 h-4 w-4" />
            {/if}
            <span>Publicera</span>
          </Form.Button>
        {:else}
          <Form.Button type="submit" formaction="?/unpublish">
            {#if delayed}
              <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
            {:else}
              <Icons.unpublish class="mr-2 h-4 w-4" />
            {/if}
            <span>Avpublicera</span>
          </Form.Button>
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
          Uppdaterad: {formatRelative(new Date(post.updated_at ?? ""))}
        {/if}
      </p>

      <Form.Field {config} name="title" let:value>
        <Form.Item>
          <Form.Input
            autofocus
            placeholder="Ange en rubrik"
            {value}
            class="w-full h-auto resize-none appearance-none overflow-hidden bg-transparent text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold focus:outline-none"
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>

      <input type="hidden" name="body" value={bodyString} />
      <TipTap
        body={post.body}
        onUpdate={function updateBodyString(json) {
          bodyString = JSON.stringify(json);
        }}
      />
    </div>
  </div>
</Form.Root>
