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
