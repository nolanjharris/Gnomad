SELECT username, user_id, first_name, last_name, country_color FROM users u
JOIN friends f ON u.user_id = f.user2_id
WHERE f.user1_id = $1 AND f.verified = true;