<script lang="ts">
  import Toast from "./toast.svelte";
  import { dismissToast, toasts } from "./store";
</script>

{#if $toasts}
  <section
    class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
  >
    {#each $toasts as toast (toast.id)}
      <Toast
        type={toast.type}
        dismissible={toast.dismissible}
        on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
      >
    {/each}
  </section>
{/if}
