update polls
set options = $1
where poll_id = $2;

select * from polls
where poll_id = $2;