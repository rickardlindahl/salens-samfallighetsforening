<script lang="ts">
  export let setValue: (v: unknown) => void;
  export let documentId: string = "";
  $: if (documentId) setValue(documentId);
</script>
