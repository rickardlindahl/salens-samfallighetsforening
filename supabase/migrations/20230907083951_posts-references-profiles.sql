alter table posts
  add column profile_id uuid references public.profiles not null;
