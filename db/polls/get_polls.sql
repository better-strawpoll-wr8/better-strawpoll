SELECT * FROM polls
WHERE user_id = $1
order by poll_id desc;