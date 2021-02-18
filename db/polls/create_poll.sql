INSERT INTO polls
(user_id, subject, options, date_created, expiry_date)
VALUES
($1, $2, $3, $4, $5)
returning *;