DELETE FROM user_travels
WHERE user_id = $1 
AND country_id = (SELECT country_id FROM country 
                  WHERE country_name = $2);