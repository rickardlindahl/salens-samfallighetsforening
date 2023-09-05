<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import Avatar from "./(components)/avatar.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { cn } from "$lib/utils";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  export let data: PageData;

  let { supabase, profile } = data;
  $: ({ supabase, profile } = data);

  let profileForm: HTMLFormElement;
  let loading = false;
  let fullName: string = profile?.full_name ?? "";
  let avatarUrl: string = profile?.avatar_url ?? "";

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };
</script>

<form method="POST" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
  <div class="space-y-8">
    <div class="space-y-2">
      <Label>Namn</Label>
      <Input name="fullName" placeholder="Förnamn Efternamnsson" value={fullName} />
      <div class="text-[0.8rem] text-muted-foreground">
        I detta fält fyller du i ditt för- och efternamn.
      </div>
    </div>
    <div class="space-y-2">
      <Label>Profilbild</Label>
      <Avatar
        {supabase}
        bind:url={avatarUrl}
        on:upload={() => {
          profileForm.requestSubmit();
        }}
      />
    </div>

    <Separator />

    <div class="space-y-2">
      <button type="submit" class={cn(buttonVariants())} disabled={loading}>Uppdatera profil</button
      >
    </div>
  </div>
</form>
