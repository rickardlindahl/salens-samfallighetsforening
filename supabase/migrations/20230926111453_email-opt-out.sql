alter table profiles
add column enable_notification_email_new_posts boolean default true not null;

alter table profiles
add column enable_notification_email_new_documents boolean default true not null;