<script lang="ts">
  import type { PageData } from "./$types";
  import LayoutShell from "$lib/components/layout-shell.svelte";
  import ProfileSettingsForm from "./profile-settings-form.svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { cn } from "$lib/utils";
  import { buttonVariants } from "$lib/components/ui/button";

  export let data: PageData;
</script>

<svelte:head>
  <title>Hantera dina kontoinställningar | Salens Samfällighetsförening</title>
</svelte:head>

<LayoutShell heading="Inställningar" text="Hantera dina kontoinställningar.">
  <div slot="content" class="grid gap-2">
    <ProfileSettingsForm form={data.form} />
    <Separator />
    <a href="/auth/reset-password" class={cn(buttonVariants({ variant: "link" }))}>Byt lösenord</a>
  </div>
</LayoutShell>
