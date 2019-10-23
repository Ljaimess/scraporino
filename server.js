//need these
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");
//the express things
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//for handle bars here

// this stuff


// const mongod_uri = process.envMONGOD_URI || process.env.MONGOD_URL || "mongod://localhost/scrappynews";

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://Ljaimes:calcihera25@ds137488.mlab.com:37488/heroku_9f1pvn3m";
const MONGODB_URI = process.env.MONGODB_URI || "mongod://localhost/scrappynews"


mongoose.connect(MONGODB_URI);

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

app.get("/scrape", function (req, res) {
    
    axios.get("http://www.theonion.com/").then(function (response) {

        let $ = cheerio.load(response.data);
        $("section").each(function (i, element) {
            let result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            db.Article.create(result)
                .then(dbArticle => {
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
        });
});

app.get("/articles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
        .populate("comment")
        .then(function (dbArticle) {
    
            res.json(dbArticle);
        })
        .catch(function (err) {
  
            res.json(err);
        });
});

app.post("/articles/:id", (req, res) => {
    db.Comment.create(req.body)
        .then(function (dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.parama.id }, { comment: dbComment._id }, { new: true });
        })
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});


app.listen(PORT, function() {
    console.log("App being summoned on http://localhost:" + PORT);
});
