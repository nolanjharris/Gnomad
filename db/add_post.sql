INSERT INTO user_travels
(user_id, country_id)
VALUES
($1, (SELECT country_id FROM country WHERE country_name = $2));

INSERT INTO posts
(user_id, country_id, post_content, upload_date)
VALUES
($1, 
(SELECT country_id FROM country WHERE country_name = $2),
$3,
$4)
returning *;