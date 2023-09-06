create type role_enum as enum ('admin', 'user');

alter table profiles
  add column role role_enum not null default 'user';

-- Add function that checks that a role change is done by an admin
create or replace function check_admin_role()
returns trigger as $$
begin
    if (pg_has_role(current_user, 'admin') or current_user = 'postgres') then
        return new;
    else
        raise exception 'Only users with the "admin" role can modify the "role" column.';
    end if;
end;
$$ language plpgsql;

-- Add trigger that runs the function above if the role has been changed
create trigger prevent_self_role_update
before update on profiles
for each row
when (old.role is distinct from new.role)
execute function check_admin_role();
