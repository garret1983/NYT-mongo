
var scrape = require("../scripts/scrape");
var Article = require("../models/Article");
var articlesController = require("../controllers/articles");

module.exports = function(router) {

    router.get("/", function(req, res) {
        Article.find({saved: false}, function(error, found) {
            if(error) {
                console.log(error); 
            } else if (found.length === 0) {
                res.render("empty")
            } else {
            var hgbObject = {
                articles: found
            }; 
            res.render("index", hbsOject); 
        }
    }); 
}); 
}

