-- id (int/primary column/auto increase),
-- region (text),
-- title (text),
-- type (text)
-- change_date (timestamp)
-- fs_id (text)
-- url (text)
-- price_sorting_f (float)
-- price_lowest_f (float)

-- https://learnxinyminutes.com/docs/sql/

drop table games_eu;
create table games_eu (
    id serial primary key,
    fs_id text unique,
    region text,
    price_has_discount_b boolean,
    price_discount_percentage_f float,
    title text,
    dates_released_dts timestamp[],
    pretty_date_s text,
    "type" text,
    change_date timestamp,
    url text,
    price_sorting_f float,
    price_lowest_f float,
    image_url text
);

-- discount_price / discount_percentage * 100

-- original = 100 eur
-- discount = 20%
-- discounted price = original * (100 - discount)/100
-- discounted_price * 100 / (100 - discount) = original

-- ETL: extract, transform, load
-- data pipeline

-- select
--     title,
--     price_sorting_f,
--     price_discount_percentage_f,
--     round((price_sorting_f * 100 / (100 - price_discount_percentage_f))::numeric, 2) as price_original_f,
--     (price_sorting_f * 100 / (100 - price_discount_percentage_f)) as price_original_f
-- from games_eu where price_has_discount_b is true;
