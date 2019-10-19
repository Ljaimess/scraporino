//need these
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");
//the express things
const PORT = 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//for handle bars here

// this stuff


// const mongod_uri = process.envMONGOD_URI || process.env.MONGOD_URL || "mongod://localhost/scrappynews";

mongoose.connect("mongodb://localhost/scrappynews", { useNewUrlParser: true }), { useUnifiedTopology: true };

app.get("/scrape", function (req, res) {
    
    axios.get("http://www.theonion.com/").then(function (response) {

        var $ = cheerio.load(response.data);
        $("section").each(function (i, element) {
            let result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            db.Article.create(result).then(dbArticle => {
                console.log(dbArticle);
            })
                .catch(err => {
                    console.log("There is a error line 43" + err);
                    
                });
        });
        res.send("Check that scraping");
    });
});

app.get("/articles", (req, res) => {
    db.Article.find({})
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        })
})


app.listen(PORT, function() {
    console.log("App being summoned on http://localhost:" + PORT);
});
