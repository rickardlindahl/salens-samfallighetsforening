<script lang="ts">
  import UserAvatar from "$lib/components/user-avatar.svelte";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import type { Profile } from "../../../types/database";
  import type { Database } from "../../../types/supabase";

  export let profile: Profile;
  export let supabase: SupabaseClient<Database>;
</script>

<div class="flex items-center">
  <UserAvatar
    {supabase}
    name={profile.full_name ?? undefined}
    image={profile.avatar_url ?? undefined}
  />
  <div class="ml-4 space-y-1">
    {#if profile.full_name}
      <p class="text-sm font-medium leading-none">{profile.full_name}</p>
    {/if}
    <p class="text-sm text-muted-foreground">
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </p>
  </div>
</div>
