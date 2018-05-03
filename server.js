// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

var express = require("express"); 
var bodyParser = require("body-parser"); 
var mongoose = require("mongoose"); 
var exphbs = require("express-handlebars"); 
var Article = require("./models/Article.js");  

var app = express(); 

app.use(bodyParser.urlencoded({
    extended: false
})); 

app.use(express.static(process.cwd() + "/public")); 

var databaseUri = "mongodb://localhost/savedarticlesmongo"; 
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI); 
} else {
    mongoose.connect(databaseUri); 
}

var db = mongoose.connection; 

db.on("error", function(error) {
    console.log("mongoose error"); 
}); 

db.once("open", function() {
    console.log("mongoose connection successful"); 
}); 

app.engine("handlebars", exphbs({ defaultLayout: "main"})); 
app.set("view engine", "handlebars"); 

var router = express.Router(); 

require("./config/routes")(router); 

app.use(router); 

var port = process.env.PORT || 3001; 

app.listen(port, function() {
    console.log("app runnig on port" + port); 

}); 



