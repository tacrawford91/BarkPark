//Server set up
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./app/models");

//Set Up Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("app/public"));

var htmlRoutes = require("./app/controller/htmlRoutes.js");
var parkApiRoutes = require("./app/controller/parkApiRoutes.js");
var userApiRoutes = require("./app/controller/userApiRoutes.js");

//Use routes - 
app.use("/", htmlRoutes);
app.use("/api", parkApiRoutes);
app.use("/api", userApiRoutes);




// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});