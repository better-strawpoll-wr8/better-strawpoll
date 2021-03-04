SELECT * FROM polls
where expiry_date > CURRENT_TIMESTAMP
order by poll_id desc
limit 10;