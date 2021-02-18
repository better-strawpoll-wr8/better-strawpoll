
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
date_created date not null,
expiry_date date not null);

create table comments (
comment_id SERIAL PRIMARY KEY,
user_id int references bs_users (id),
poll_id int references polls(poll_id),
comment VARCHAR(120) );



