SELECT username, user_id, first_name, last_name FROM users u
JOIN friends f ON u.user_id = f.user1_id
WHERE f.user2_id = $1 AND f.verified = false;