create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  updated_at timestamp with time zone,
  title text not null,
  body json,
  image text,
  draft boolean default true,
  publish_date timestamp with time zone
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table posts
  enable row level security;

-- Allow read access to published posts
create policy "Users can select their own posts. Everyone can select published posts that are not drafts." on posts
  for select
  using (
    (auth.uid() = user_id) or
    (draft = false and publish_date <= now())
  );

create policy "Users can insert their own post." on posts
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own posts." on posts
  for update using (auth.uid() = user_id);

