SELECT
    musician.*
FROM
    musician
INNER JOIN
    ensemble_musician
ON
    ensemble_musician.ensemble_id = ${id} AND ensemble_musician.ensemble_id = musician.id;
