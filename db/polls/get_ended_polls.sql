 SELECT * FROM polls
 WHERE expiry_date < CURRENT_TIMESTAMP
order by expiry_date desc
limit 10;