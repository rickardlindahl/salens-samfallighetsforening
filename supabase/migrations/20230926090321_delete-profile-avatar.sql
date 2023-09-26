alter table profiles
drop column avatar_url;

delete from storage.objects where bucket_id = 'avatars';
delete from storage.buckets where id = 'avatars';