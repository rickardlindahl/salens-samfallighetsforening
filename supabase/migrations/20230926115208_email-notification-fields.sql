alter table posts
add column email_notification_sent boolean default false not null,
add column email_notification_sent_at timestamp with time zone;

alter table documents
add column email_notification_sent boolean default false not null,
add column email_notification_sent_at timestamp with time zone;
