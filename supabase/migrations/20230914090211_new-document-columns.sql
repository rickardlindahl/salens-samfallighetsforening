alter table documents
rename column file_url to storage_path;

alter table documents
add column file_name text not null;

alter table documents
add column file_size bigint not null;
