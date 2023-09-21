create policy "Users can delete their own posts." on posts
  for delete using (auth.uid() = user_id and auth.uid() = profile_id);