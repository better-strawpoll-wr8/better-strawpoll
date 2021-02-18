INSERT INTO comments
(user_id, poll_id, comment)
VALUES
($1, $2, $3)
returning *;
