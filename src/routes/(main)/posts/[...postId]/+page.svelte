<script lang="ts">
  import type { PageData } from "./$types";
  import type { Json } from "../../../../types/supabase";
  import type { JSONContent } from "@tiptap/core";
  import { generateHTML } from "@tiptap/html";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import Heading from "@tiptap/extension-heading";
  import { formatRelative } from "$lib/date";

  export let data: PageData;

  function renderHTML(json: Json) {
    return generateHTML(json as JSONContent, [
      Document,
      Heading.configure({
        levels: [2],
        HTMLAttributes: {
          class:
            "mt-6 scroll-m-20 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold tracking-tight first:mt-0",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "leading-7 [&:not(:first-child)]:mt-4",
        },
      }),
      Text,
    ]);
  }

  let { post } = data;
</script>

<article class="flex flex-col gap-4">
  <h1 class="w-full h-auto text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold">
    {post.title}
  </h1>
  <p class="text-sm flex items-center gap-x-4 flex-wrap">
    {#if post.publish_date}
      <time class="text-foreground/70">
        {formatRelative(new Date(post.publish_date))}
      </time>
    {/if}
    <span>·</span>
    <span class="text-foreground/70">
      <a href={`mailto:${post.profile.email}`}>
        {post.profile.full_name || post.profile.email}
      </a>
    </span>
  </p>
  {@html renderHTML(post.body)}
</article>
