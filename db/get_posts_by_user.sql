SELECT *, c.country_name FROM posts p
JOIN country c ON p.country_id = c.country_id
WHERE user_id = $1;