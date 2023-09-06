<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import UserAvatar from "$lib/components/user-avatar.svelte";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import type { Profile } from "../../types/database";
  import { Icons } from "./icons";

  export let profile: Profile;
  export let supabase: SupabaseClient;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <UserAvatar
      {supabase}
      name={profile.full_name ?? undefined}
      image={profile.avatar_url ?? undefined}
    />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="align-end">
    <DropdownMenu.Group>
      <div class="flex items-center justify-start gap-2 p-2">
        <div class="flex flex-col space-y-1 leading-none">
          {#if profile.full_name}
            <p class="font-medium">{profile.full_name}</p>
          {/if}
          <p class="w-[200px] truncate text-sm text-muted-foreground">
            {profile.email}
          </p>
        </div>
      </div>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>
        <a href="/dashboard" class="flex items-center w-full"
          ><Icons.dashboard class="w-4 h-4 mr-2" />Översikt</a
        >
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a href="/dashboard/settings" class="flex items-center w-full"
          ><Icons.settings class="w-4 h-4 mr-2" />Inställningar</a
        >
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item class="cursor-pointer">
        <form action="/auth/logout" method="POST" class="w-full">
          <button type="submit" class="flex items-center w-full"
            ><Icons.logout class="w-4 h-4 mr-2" />Logga ut</button
          >
        </form>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
