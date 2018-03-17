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


//map page

//profile page

//park page


module.exports = router;