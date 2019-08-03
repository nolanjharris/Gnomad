UPDATE posts
SET post_content = $3
WHERE country_id = (SELECT country_id FROM country WHERE country_name = $2)
AND user_id = $1;