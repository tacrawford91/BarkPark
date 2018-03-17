//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");

var path = require("path");


    
router.get("/", (req,res) => {
    //send landing page
    res.sendfile(path.join(__dirname, "../views/login.html"));
});

router.get("/main", (req,res) => {
    //send landing page
    res.sendfile(path.join(__dirname, "../views/main.html"));
});

//sign up form
router.get("/newDog", (req,res) => {
    res.sendfile(path.join(__dirname, "../views/form.html"));
})


//map page

//profile page

//park page


module.exports = router;