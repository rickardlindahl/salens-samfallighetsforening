<script lang="ts">
  import { cn } from "$lib/utils";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Icons } from "$lib/components/icons";
  import type { PageData } from "./$types";
  import { forgotPasswordSchema } from "$lib/schema";

  export let data: PageData;
</script>

<svelte:head>
  <title>Glömt lösenord | Salens Samfällighetsförening</title>
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
      <h1 class="text-2xl font-semibold tracking-tight">Glömt lösenord.</h1>
      <p class="text-sm text-muted-foreground">
        Fyll i din epost för att få en länk där du kan ändra ditt lösenord
      </p>
    </div>

    <div class="grid gap-6">
      <Form.Root form={data.form} schema={forgotPasswordSchema} let:config>
        <div class="grid gap-2">
          <Form.Field {config} name="email">
            <Form.Item>
              <Form.Input />
              <Form.Validation />
            </Form.Item>
          </Form.Field>

          <div class="grid gap-1">
            <Form.Button>Skicka epost</Form.Button>
          </div>
        </div>
      </Form.Root>
    </div>
  </div>
</div>
