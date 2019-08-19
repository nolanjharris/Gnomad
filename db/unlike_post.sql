DELETE FROM post_likes
WHERE user_id = $1 AND post_id = $2;

UPDATE posts
SET likes = likes - 1
WHERE post_id = $2;