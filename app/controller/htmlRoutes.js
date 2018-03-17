//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");


    
router.get("/", (req,res) => {

    //send landing page
    res.send("main")
})

//sign up form
router.get("/newDog", (req,res) => {
    console.log("I heareareasr you")
    res.render("form.html");
})


//map page

//profile page

//park page


module.exports = router;