<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import type { Profile } from "../../types/database";
  import { Icons } from "./icons";
  import * as Avatar from "./ui/avatar";

  export let profile: Profile;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Avatar.Root>
      <Avatar.Fallback>
        <span class="sr-only">{profile.full_name}</span>
        <Icons.user class="h-4 w-4" />
      </Avatar.Fallback>
    </Avatar.Root>
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
        <a href="/dashboard/posts" class="flex items-center w-full"
          ><Icons.newspaper class="w-4 h-4 mr-2" />Inlägg</a
        >
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a href="/dashboard/documents" class="flex items-center w-full"
          ><Icons.file class="w-4 h-4 mr-2" />Dokument</a
        >
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a href="/dashboard/settings" class="flex items-center w-full"
          ><Icons.settings class="w-4 h-4 mr-2" />Inställningar</a
        >
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      {#if profile.role === "admin"}
        <DropdownMenu.Item>
          <a href="/admin" class="flex items-center w-full"
            ><Icons.lock class="w-4 h-4 mr-2" />Admin</a
          >
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
      {/if}
      <DropdownMenu.Item class="cursor-pointer">
        <form action="/auth/logout" method="post" class="w-full">
          <button type="submit" class="flex items-center w-full"
            ><Icons.logout class="w-4 h-4 mr-2" />Logga ut</button
          >
        </form>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
