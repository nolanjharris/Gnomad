INSERT INTO users
(first_name, last_name, username, password, country_color)
VALUES
($1, $2, $3, $4, $5)
returning *;