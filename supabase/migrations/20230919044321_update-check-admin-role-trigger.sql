-- Add function that checks that a role change is done by an admin
create or replace function check_admin_role()
returns trigger as $$
begin
    -- Check if the current user has the "admin" role or is the "postgres" superuser
    if (
        exists (
            select 1
            from profiles p
            where p.id = auth.uid() and p.role = 'admin'
        )
        or current_user = 'postgres'
    ) then
        return new;
    else
        raise exception 'Only users with the "admin" role can modify the "role" column.';
    end if;
end;
$$ language plpgsql;