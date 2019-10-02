const express = require('express')
const app = express()
const port = 3000

// TODO: Make this server auto-reloadable

// 1. connect to the db (same as the import.js script)
const pg = require('pg')
const dbClient = new pg.Client({
    // TODO Make this configurable
    user: 'ubuntu',
    password: 'heytheredelilah'
  })
dbClient.connect()

// https://node-postgres.com/features/queries
// https://node-postgres.com/api/result

// GET localhost:3000/?sortby=price
// <a href="localhost:3000/?sortby=price&ngadethuong=maxlevel"> query string
// (maybe) merge the scrapper and the view into one single NodeJS project? AGREE
app.get('/', (req, res) => {
    // How to get the query string in expressjs?
    console.log(req.query)

    // make it work
    // make it work right
    // make it work fast

    // we need 2 SQL queries
    // - without sorting
    // - with sorting by price
    // and choose the correct one according to the query string

    // the default query
    let sqlQuery = 'SELECT title, price_sorting_f, pretty_date_s, image_url FROM games_eu'

    if (req.query.sortby === "price") {
      sqlQuery += ' ORDER BY "price_sorting_f"'
    }

    // This is BAD code and very insecure
    // TODO sanitize the input (adding validation)
    // SQL injection

    const currentOffset = parseInt(req.query.offset, 10) || 0
    const currentLimit = parseInt(req.query.limit, 10) || 10
    sqlQuery += ` LIMIT ${currentLimit} OFFSET ${currentOffset}`

    // 2. query the games_eu table
    dbClient.query(sqlQuery)
    .then(function(result) {
      // result has type pg.Result (https://node-postgres.com/api/result)
      // it has the important `rows` property

      // foo: ran, Nam
      // bar: dom, Linh
      // always read the manual
      // remember, in JS, when in doubt, JSON.stringify(everything)/console.log

      // 3. render the result as an HTML table
      let tableContent = ''

      for (row of result.rows) {
        tableContent += `
          <tr>
            <td><img src="${row.image_url}"></td>
            <td>${row.title}</td>
            <td>${row.price_sorting_f}</td>
            <td>${row.pretty_date_s}</td>
          </tr>`
      }

      // next step: move this template into an HTML templating language
      // for example: https://pugjs.org/api/getting-started.html
      let htmlBody = `
      <style>
        tr:nth-child(even) {background-color: #f2f2f2;}
      </style>

      <a href="?offset=${currentOffset <= 0 ? 0 : currentOffset - 10}">Prev</a>
      <a href="?offset=${currentOffset + 10}">Next</a>

      <table>
        <caption>All the games!!!!</caption>
        <thead>
          <tr>
              <th>Title</th>
              <th><a href="?sortby=price">Price</a></th>
              <th>Date Released</th>
          </tr>
        </thead>

        <tbody>
          ${tableContent}
        </tbody>
      </table>
      `

      // res has type express.Response (https://expressjs.com/en/4x/api.html#res)
      res.send(htmlBody)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
