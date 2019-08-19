update posts 
set likes = likes + 1 
where post_id = $1;

insert into post_likes
(user_id, post_id, liked)
values
($2, $1, true);