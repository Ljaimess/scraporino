// const cheerio = require("cheerio");
// const axios = require("axios");
// const db = require("./models");

// console.log("r 1");
// module.exports = function (app) {
//     app.get("/scrape", function (req, res) {
//         axios.get("https://theonion.com/").then(function (response) {
//             var $ = cheerio.load(response.data);

//             $("article").each(function (i, element) {
//                 let result = {};

//                 result.title = $(this).children("a").text();
//                 result.link = $(this).children("a").attr("href");

//                 db.Article.create(result).then(dbArticle => {
//                     console.log(dbArticle);
//                 })
//                     .catch(err => {
//                         console.log(err);
//                     });
                
//             });
//             res.send("Chack that scraping");
//         });
//     });
// };