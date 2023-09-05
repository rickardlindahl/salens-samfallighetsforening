<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import UserAvatar from "$lib/components/user-avatar.svelte";
  import type { User } from "@supabase/supabase-js";

  export let user: User;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <UserAvatar />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="align-end">
    <DropdownMenu.Group>
      <div class="flex items-center justify-start gap-2 p-2">
        <div class="flex flex-col space-y-1 leading-none">
          {#if user.user_metadata.name}
            <p class="font-medium">{user.user_metadata.name}</p>
          {/if}
          {#if user.email}
            <p class="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          {/if}
        </div>
      </div>
      <DropdownMenu.Separator />
      <DropdownMenu.Item class="cursor-pointer">
        <form action="/auth/logout" method="POST">
          <button type="submit">Logga ut</button>
        </form>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
