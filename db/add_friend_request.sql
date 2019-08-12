INSERT INTO friends
(user1_id, user2_id, verified, friend_color)
VALUES
($1, $2, false, (SELECT country_color FROM users WHERE user_id = $2));