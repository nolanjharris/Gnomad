SELECT * FROM posts p
JOIN country c ON c.country_id = p.country_id
WHERE c.country_name = $1;
