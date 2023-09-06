<script lang="ts">
  import { cn } from "$lib/utils";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Icons } from "$lib/components/icons";
  import { page } from "$app/stores";

  const searchParams = new URLSearchParams($page.url.hash.replace("#", "?"));
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
</script>

<svelte:head>
  <title>Ändra lösenord</title>
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
      <form method="post" action="/auth/reset-password">
        <input type="hidden" value={accessToken} name="accessToken" />
        <input type="hidden" value={refreshToken} name="refreshToken" />
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Label for="password">Lösenord</Label>
            <Input id="password" name="password" type="password" />
            <button class={cn(buttonVariants())}>Uppdatera lösenord</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
