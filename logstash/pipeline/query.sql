SELECT "id", "title", "language", "code", "description", extract(epoch from "updatedAt") as "unix_ts_in_secs" 
FROM "Post" 
WHERE (extract(epoch from "updatedAt") > :sql_last_value AND "updatedAt" < NOW()) 
ORDER BY "updatedAt" ASC