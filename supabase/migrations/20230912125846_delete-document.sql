create policy "Users can delete their own documents." on documents
  for delete using (auth.uid() = user_id and auth.uid() = profile_id);

create policy "Users can delete their own documents." on storage.objects
  for delete using (auth.uid() = owner and bucket_id = 'documents');

alter table documents
rename column file_url to storage_path;

alter table documents
add column file_name text not null;
