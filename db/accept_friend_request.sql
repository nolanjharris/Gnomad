UPDATE friends
SET verified = true
WHERE user1_id = $2 AND user2_id = $1;

INSERT INTO friends
(user1_id, user2_id, verified)
VALUES
($1, $2, true);