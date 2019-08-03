SELECT country_name FROM country c
JOIN user_travels ut ON c.country_id = ut.country_id
JOIN users u ON u.user_id = ut.user_id
WHERE ut.user_id = $1;