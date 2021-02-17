
update bs_users
set username = $1
where id = $2;

select id, email, username, profile_picture from 
bs_users 
where id = $2;