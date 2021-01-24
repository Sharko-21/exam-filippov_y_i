SELECT
    *,
    'plate' AS query_type
FROM
    plate
WHERE
    name ILIKE '%'|| ${name} || '%'