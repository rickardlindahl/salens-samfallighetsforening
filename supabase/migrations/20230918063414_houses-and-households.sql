create table houses (
  id uuid default gen_random_uuid() primary key,
  street_address text not null,
  house_number integer not null,
  unique(street_address, house_number)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table houses
  enable row level security;

create policy "Houses are viewable by everyone." on houses
  for select using (true);

-- Create a trigger function to prevent updates to street_address and house_number
create or replace function prevent_address_updates()
returns trigger as $$
begin
    new.street_address := old.street_address;
    new.house_number := old.house_number;
    return new;
end;
$$ language plpgsql;

-- Create the before update trigger
create trigger enforce_address_update_policy
before update of street_address, house_number on houses
for each row
execute function prevent_address_updates();

create table household_members (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  profile_id uuid references public.profiles not null,
  house_id uuid references public.houses not null,
  unique(user_id, profile_id, house_id)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table household_members
  enable row level security;

create policy "Household members are viewable by everyone." on household_members
  for select using (true);
