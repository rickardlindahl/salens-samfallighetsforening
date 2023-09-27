<script lang="ts">
  import { cn } from "$lib/utils";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Icons } from "$lib/components/icons";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { resetPasswordFormSchema } from "$lib/schema";
  import InputValueBinder from "$lib/components/input-value-binder.svelte";

  const searchParams = new URLSearchParams($page.url.hash.replace("#", "?"));

  export let data: PageData;

  const accessToken = data.accessToken ?? searchParams.get("access_token");
  const refreshToken = data.refreshToken ?? searchParams.get("refresh_token");
</script>

<svelte:head>
  <title>Ändra lösenord | Salens Samfällighetsförening</title>
</svelte:head>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
  <a
    href="/"
    class={cn(buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8")}
  >
    <Icons.arrowLeft class="mr-2 h-4 w-4" />
    Tillbaka
  </a>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <Icons.logo class="mx-auto h-6 w-6" />
      <h1 class="text-2xl font-semibold tracking-tight">Ändra lösenord.</h1>
      <p class="text-sm text-muted-foreground">
        Fyll i ditt nya lösenord som du använder för att logga in på ditt konto
      </p>
    </div>

    <div class="grid gap-6">
      <Form.Root form={data.form} schema={resetPasswordFormSchema} let:config>
        <div class="grid gap-2">
          <Form.Field {config} name="password">
            <Form.Item>
              <Form.Label>Lösenord</Form.Label>
              <Form.Input type="password" />
              <Form.Validation />
            </Form.Item>
          </Form.Field>

          <div class="grid gap-1">
            <Form.Button>Uppdatera lösenord</Form.Button>
          </div>
        </div>

        <Form.Field {config} name="accessToken" let:value let:setValue>
          <InputValueBinder {setValue} value={accessToken} />
          <Form.Input type="hidden" {value} />
          <Form.Validation />
        </Form.Field>

        <Form.Field {config} name="refreshToken" let:value let:setValue>
          <InputValueBinder {setValue} value={refreshToken} />
          <Form.Input type="hidden" {value} />
          <Form.Validation />
        </Form.Field>
      </Form.Root>
    </div>
  </div>
</div>
