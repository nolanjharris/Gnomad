INSERT INTO user_travels
(user_id, country_id)
VALUES
($1, (SELECT country_id FROM country WHERE country_name = $2))