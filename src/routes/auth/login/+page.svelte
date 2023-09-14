<script lang="ts">
  import { cn } from "$lib/utils";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Icons } from "$lib/components/icons";
  import { page } from "$app/stores";

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
  {#if message}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-16"
      role="alert"
    >
      <span class="block sm:inline">{message}</span>
    </div>
  {/if}
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <Icons.logo class="mx-auto h-6 w-6" />
      <h1 class="text-2xl font-semibold tracking-tight">Välkommen tillbaka!</h1>
      <p class="text-sm text-muted-foreground">
        Fyll i dina uppgifter för att logga in på ditt konto
      </p>
    </div>

    <div class="grid gap-6">
      <form method="post" action="/auth/login">
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Label for="email">Epost</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autocapitalize="none"
              autocomplete="email"
              autocorrect="off"
            />
          </div>

          <div class="grid gap-1">
            <Label for="password">Lösenord</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <div class="grid gap-1">
            <button class={cn(buttonVariants())}>Logga in</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
