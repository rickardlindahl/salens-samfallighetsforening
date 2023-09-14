<script lang="ts">
  import { cn } from "$lib/utils";
  import * as Alert from "$lib/components/ui/alert";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Icons } from "$lib/components/icons";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { loginFormSchema } from "./schema";

  export let data: PageData;

  let message: string;

  $: message = $page.url.searchParams.get("message") ?? "";
</script>

<svelte:head>
  <title>Logga in</title>
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
    {#if message}
      <Alert.Root variant="destructive">
        <Icons.alert class="h-4 w-4" />
        <Alert.Title>Ej behörig</Alert.Title>
        <Alert.Description>
          {message}
        </Alert.Description>
      </Alert.Root>
    {/if}
    <div class="flex flex-col space-y-2 text-center">
      <Icons.logo class="mx-auto h-6 w-6" />
      <h1 class="text-2xl font-semibold tracking-tight">Välkommen tillbaka!</h1>
      <p class="text-sm text-muted-foreground">
        Fyll i dina uppgifter för att logga in på ditt konto
      </p>
    </div>

    <div class="grid gap-6">
      <Form.Root form={data.form} schema={loginFormSchema} let:config>
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Form.Field {config} name="email">
              <Form.Label>Epost</Form.Label>
              <Form.Input
                placeholder="name@example.com"
                type="email"
                autocapitalize="none"
                autocomplete="email"
                autocorrect="off"
              />
              <Form.Validation />
            </Form.Field>
          </div>

          <div class="grid gap-1">
            <Form.Field {config} name="password">
              <Form.Label>Lösenord</Form.Label>
              <Form.Input type="password" />
              <Form.Validation />
            </Form.Field>
          </div>
          <div class="grid gap-1">
            <Form.Button>Logga in</Form.Button>
          </div>
        </div>
      </Form.Root>
    </div>
  </div>
</div>
