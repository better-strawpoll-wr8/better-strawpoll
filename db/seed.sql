
create table bs_users (
id SERIAL PRIMARY KEY,
email VARCHAR(120) not null,
username VARCHAR(120) not null,
hash text not null,
profile_picture text);

create table polls (
poll_id SERIAL PRIMARY KEY,
user_id int references bs_users(id),
subject VARCHAR(120) not null,
options json not null,
date_created timestamp not null,
expiry_date timestamp not null);

create table comments (
comment_id SERIAL PRIMARY KEY,
user_id int references bs_users (id),
username  VARCHAR(120),
profile_picture text,
poll_id int references polls(poll_id),
comment VARCHAR(300) );



