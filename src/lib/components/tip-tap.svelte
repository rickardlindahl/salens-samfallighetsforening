<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor, type JSONContent } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { cn } from "$lib/utils";
  import { Button, buttonVariants } from "./ui/button";
  import type { Json } from "../../types/supabase";

  let element: HTMLDivElement;
  let editor: Editor;
  export let body: Json | JSONContent | null;

  onMount(() => {
    editor = new Editor({
      element: element,
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none bg-transparent rounded-md border border-input px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full h-auto appearance-none",
        },
      },
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [2, 3],
            HTMLAttributes: {
              class:
                "mt-6 scroll-m-20 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold tracking-tight first:mt-0",
            },
          },
          paragraph: {
            HTMLAttributes: {
              class: "leading-7 [&:not(:first-child)]:mt-4",
            },
          },
        }),
      ],
      content: body as JSONContent,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  $: if (editor) {
    body = editor.getJSON();
  }
</script>

<div class="mb-2 flex gap-x-4">
  {#if editor}
    <Button
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class={cn(
        buttonVariants({
          variant: editor.isActive("heading", { level: 2 }) ? "default" : "secondary",
        }),
      )}
    >
      H2
    </Button>
    <Button
      on:click={() => editor.chain().focus().setParagraph().run()}
      class={cn(
        buttonVariants({
          variant: editor.isActive("paragraph") ? "default" : "secondary",
        }),
      )}
    >
      P
    </Button>
  {/if}
</div>

<div bind:this={element} class="min-h-[500px]" />
