<script lang="ts">
  import TipTap from "$lib/components/tip-tap.svelte";
  import type { JSONContent } from "@tiptap/core";
  import type { Json } from "../../../types/supabase";

  export let value: JSONContent | Json | null;
  export let setValue: (v: typeof value) => void;

  function handleUpdate(json: JSONContent) {
    console.log("handleUpdate", { json, value, stringified: JSON.stringify(json) });
    setValue(JSON.stringify(json));
  }
</script>

<TipTap body={value} onUpdate={handleUpdate} />
