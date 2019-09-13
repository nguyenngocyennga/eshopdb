const eshop = require("nintendo-switch-eshop");
const fs = require('fs');

eshop.getGamesEurope().then(function(result) {
    fs.writeFile("europe.json", JSON.stringify(result, null, 4), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});

// Next task:
// 1. Create the view layer with RoR. The view layer will display the europe.json file directly to the web browser.
// 2. Convert europe.json into a SQLite database
// 3. Add Ruby models to fit the EuropeGame objects
