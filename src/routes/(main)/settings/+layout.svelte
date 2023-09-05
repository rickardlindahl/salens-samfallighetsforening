<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import SidebarNav from "./(components)/sidebar-nav.svelte";

  const sidebarNavItems = [
    {
      title: "Profil",
      href: "/settings",
    },
    {
      title: "Meddelanden",
      href: "/settings/notifications",
      disabled: true,
    },
  ];
</script>

<div class="container space-y-6 p-10 pb-16">
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Inställningar</h2>
    <p class="text-muted-foreground">
      Hantera dina kontoinställningar och ställ in e-postpreferenser.
    </p>
  </div>
  <Separator class="my-6" />
  <div class="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
    <aside class="md:-mx-4 md:w-1/5">
      <SidebarNav items={sidebarNavItems} />
    </aside>
    <div class="flex-1 md:max-w-2xl">
      <slot />
    </div>
  </div>
</div>
