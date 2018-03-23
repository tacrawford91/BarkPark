//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");

var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated")
router.get("/", (req, res) => {
    console.log(req.app.io);

    //send landing page
    res.sendFile(path.join(__dirname, "../views/main.html"));
});


router.get("/members", isAuthenticated, function(req, res) {
    //send landing page

    res.sendFile(path.join(__dirname, "../views/memberOnly.html"));
});

//sign up form
router.get("/newDog", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/form.html"));
})


//map page

//profile page

//park page


module.exports = router;