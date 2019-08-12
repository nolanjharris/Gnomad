UPDATE friends
SET friend_color = $3
WHERE user1_id = $1 AND user2_id = $2;