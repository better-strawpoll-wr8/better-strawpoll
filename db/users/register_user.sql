INSERT INTO bs_users
(username, email, hash, profile_picture)
VALUES
($1, $2, $3, $4)
returning *;