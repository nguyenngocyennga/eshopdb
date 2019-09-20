// Method 1: quick import script: (manual import)
// - open eshop.json (how to parse a json file in nodejs?), open eshop.db (how to open a sqlite3 db in nodejs?)
// - for each object in eshop.json, create a new row in eshop.db/games, with this schema:
//   id (int/primary column/auto increase), region (text), title (text), type (text), change_date (timestamp), fs_id (text), url (text/), price_sorting_f (float), price_lowest_f (float)
// - safely close the files
//
// Method 2 (later): automatically convert json -> csv then automatically import csv into sql

// open the json file
const europe = require('../view/public/europe.json');

// for each row, print the name of the game and the price
for (let game of europe) {
  console.log(game.title, game.price_sorting_f);
}
