alter table profiles
  add column email text unique not null;

-- Create or update the trigger function
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, full_name, avatar_url, email)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email);
    return new;
end;
$$ language plpgsql security definer;

-- Create or update the trigger that fires when a new user is created
create or replace trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();
