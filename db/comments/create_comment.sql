INSERT INTO comments
(user_id, username, profile_picture, poll_id, comment)
VALUES
($1, $2, $3, $4, $5)
returning *;
