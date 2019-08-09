SELECT *, u.username FROM posts p
JOIN users u ON p.user_id = u.user_id
JOIN country c ON c.country_id = p.country_id
WHERE c.country_name = $1;
