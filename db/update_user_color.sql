UPDATE users
SET country_color = $2
WHERE user_id = $1;