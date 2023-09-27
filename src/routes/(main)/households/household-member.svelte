<script lang="ts">
  import type { Profile } from "../../../types/database";
  import { Icons } from "$lib/components/icons";
  import * as Avatar from "$lib/components/ui/avatar";

  export let profile: Profile;
</script>

<div class="flex items-center">
  <div class="space-y-2">
    {#if profile.full_name}
      <p class="font-medium leading-none">{profile.full_name}</p>
    {/if}
    <p class="text-sm text-muted-foreground hover:underline">
      <a href={`mailto:${profile.email}`} class="flex items-center gap-1"
        ><Icons.mail class="w-4 h-4" />{profile.email}</a
      >
    </p>
  </div>
</div>
