SELECT
    DISTINCT plate.id, plate.name, plate.description, plate.date, plate.produced_by, plate.wholesaler, plate.wholesale_price, plate.retail_price,
    'plate' AS query_type,
    COUNT(plate_sale.plate_id) as sold_count
FROM
    plate
LEFT JOIN
    plate_sale
ON
    plate.id = plate_sale.plate_id
WHERE
    name ILIKE '%'|| ${name} || '%'
GROUP BY plate.id, plate.name, plate.description, plate.date, plate.produced_by, plate.wholesaler, plate.wholesale_price, plate.retail_price ORDER BY sold_count DESC;