<script lang="ts">
  import { Icons } from "$lib/components/icons";
  import { formatRelative } from "$lib/date";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { cn } from "$lib/utils";
  import { postFormSchema, type PostFormSchema } from "$lib/schema";
  import type { PageData } from "./$types";
  import TipTap from "$lib/components/tip-tap.svelte";
  import type { FormOptions } from "formsnap";
  import { addToast } from "$lib/components/toast/store";
  import { actionToState, stateToToastMessage, type FormState } from "./state";

  export let data: PageData;

  let { post, form } = data;

  let bodyString: string;

  $: ({ post, form } = data);

  let state: FormState = "idle";

  const options: FormOptions<PostFormSchema> = {
    resetForm: false,
    taintedMessage:
      "Du har gjort förändringar utan att spara. Är du säker på att du vill lämna sidan utan att spara?",
    multipleSubmits: "prevent",
    onSubmit: ({ action }) => {
      state = actionToState[action.search] ?? "idle";
    },
    onResult: ({ result }) => {
      const type = result.type === "success" ? "success" : "error";

      addToast({
        type,
        message: stateToToastMessage[state][type],
      });

      state = "idle";
    },
    onError: () => {
      addToast({
        type: "error",
        message: stateToToastMessage[state].error,
      });

      state = "idle";
    },
  };
</script>

<svelte:head>
  <title>Skriv ett inlägg | Salens Samfällighetsförening</title>
</svelte:head>

<Form.Root method="post" {form} schema={postFormSchema} let:config let:delayed {options}>
  <div class="grid w-full gap-10">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center space-x-10">
        <a href="/admin/posts" class={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.arrowLeft class="mr-2 h-4 w-4" />
          Back
        </a>
      </div>

      <div class="flex flex-row gap-2">
        <Form.Button
          type="submit"
          formaction="?/save"
          class="flex items-center gap-2"
          disabled={delayed || state === "saving"}
        >
          {#if state === "saving"}
            <Icons.spinner class="h-4 w-4 animate-spin" />
            {#if post.draft}
              Sparar
            {:else}
              Uppdaterar
            {/if}
          {:else}
            <Icons.save class="h-4 w-4" />
            {#if post.draft}
              Spara
            {:else}
              Uppdatera
            {/if}
          {/if}
        </Form.Button>

        {#if post.draft}
          <Form.Button
            type="submit"
            formaction="?/publish"
            class="flex items-center gap-2"
            disabled={delayed || state === "publishing"}
          >
            {#if state === "publishing"}
              <Icons.spinner class="h-4 w-4 animate-spin" />
              <span>Publicerar</span>
            {:else}
              <Icons.publish class="h-4 w-4" />
              <span>Publicera</span>
            {/if}
          </Form.Button>
        {:else}
          <Form.Button
            type="submit"
            formaction="?/unpublish"
            class="flex items-center gap-2"
            disabled={delayed || state === "unpublishing"}
          >
            {#if state === "unpublishing"}
              <Icons.spinner class="h-4 w-4 animate-spin" />
              <span>Avpublicerar</span>
            {:else}
              <Icons.unpublish class="h-4 w-4" />
              <span>Avpublicera</span>
            {/if}
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
