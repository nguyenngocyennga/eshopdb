// Method 1: quick import script: (manual import)
// - open eshop.json (how to parse a json file in nodejs?), open eshop.db (how to open a postgres db in nodejs?)
// (https://node-postgres.com/)
// - for each object in eshop.json, create a new row in eshop.db/games, with this schema:
//   id (int/primary column/auto increase), region (text), title (text), type (text), change_date (timestamp), fs_id (text), url (text/), price_sorting_f (float), price_lowest_f (float)
// - safely close the files
//
// Method 2 (later): automatically convert json -> csv then automatically import csv into sql

const { Client } = require('pg')
// const europe = require('./europe-short.json');
const europe = require('./europe.json');

const client = new Client({
  user: 'vagrant',
  password: 'heytheredelilah'
})
client.connect()

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

// select * from games_eu;
// insert into games_eu (fs_id, region, title, type, change_date, url, price_sorting_f, price_lowest_f, image_url) values ();

// https://node-postgres.com/features/queries
// https://node-postgres.com/api/result
// client.query('SELECT * FROM games_eu')
//   .then(function(result) {
//     console.log(result)
//     // what is result's shape? what API methods does it have?
//   })

async function main() {
  for (const game of europe) {
    console.log(`inserting ${game.title}`)
    await client.query(`insert into
    games_eu (fs_id, region, price_has_discount_b, price_discount_percentage_f, title, dates_released_dts, pretty_date_s, type, change_date, url, price_sorting_f, price_lowest_f, image_url)
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, [
      game.fs_id,
      game.region,
      game.price_has_discount_b,
      game.price_discount_percentage_f,
      game.title,
      game.dates_released_dts,
      game.pretty_date_s,
      game.type,
      game.change_date,
      game.url,
      game.price_sorting_f,
      game.price_lowest_f,
      game.image_url
    ])
  }

  process.exit(0)
}

main()
