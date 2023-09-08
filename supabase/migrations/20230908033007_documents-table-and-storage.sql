-- Create a table for public documents
create table documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  profile_id uuid references public.profiles not null,
  created_at timestamp with time zone not null,
  description text not null,
  file_url text not null
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table documents
  enable row level security;

create policy "Public documents are viewable by everyone." on documents
  for select using (true);

create policy "Users can insert their own documents." on documents
  for insert with check (auth.uid() = user_id and auth.uid() = profile_id);

create policy "Users can update their own documents." on documents
  for update using (auth.uid() = user_id and auth.uid() = profile_id);

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('documents', 'documents');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Documents are publicly accessible." on storage.objects
  for select using (bucket_id = 'documents');

create policy "Anyone can upload a document." on storage.objects
  for insert with check (bucket_id = 'documents');

create policy "Anyone can update their own document." on storage.objects
  for update using (auth.uid() = owner) with check (bucket_id = 'documents');
