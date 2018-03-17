//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");

//socket io
// var io = require('socket.io')(http);

//Get single park
router.get("/park/:id", (req,res)=> {
    db.Park.findOne({where: {id: req.params.id}}).then( (data) => {
        res.json(data)
    });
});

//Get all parks
router.get("/parkall/", (req,res) => {
    db.Park.findAll({}).then( (data)  => {
        res.json(data);
    });
});

//Create New Park
router.post("/park", (req,res) => {
    console.log(req.body);
    db.Park.create(req.body).then( (dbPost) => {
        console.log(dbPost);
        res.json(dbPost);
    });
});

// Update Park
router.put("/park/:id", (req,res)=> {
    var updatedPark = {
        park_name: req.body.park_name,
        address: req.body.address
    }
    db.Park.update(updatedPark, {where: {id: req.params.id}}).then( (data) => {
        console.log(data);
        res.json(data)
    });
});


//Delete park
router.delete("/park/:id", (req,res)=> {
    db.Park.destroy({where: {id: req.params.id}}).then((data) => {
        res.json(data)
    });
});


module.exports = router;
