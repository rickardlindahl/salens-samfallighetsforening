<script lang="ts">
  export let setValue: (v: unknown) => void;
  export let value: string | null;

  $: if (value) setValue(value);
</script>
