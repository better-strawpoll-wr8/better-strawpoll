INSERT INTO bs_users
(username, email, hash)
VALUES
($1, $2, $3)
returning *;