//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");


module.exports = function(app) {
    //Get single park
    router.get("/api/park/:id", (req,res)=> {
        db.Park.findOne({where: {id: req.params.id}}).then( (data) => {
            res.json(data)
        });
    });

    //Get all parks
    router.get("/api/allParks", (req,res) => {
        db.Park.findAll({}).then( (data)  => {
            res.json(data);
        });
    });

    //Create New Park
    router.post("/api/park", (req,res) => {
        db.Park.create(req.body).then( (dbPost) => {
            res.json(dbPost);
        });
    });

    // Update Park
    router.put("/api/park/:id", (req,res)=> {
        var updatedPark = {
            park_Name: req.body.park_Name,
            address: req.body.address
        }
        db.Park.update(updatedPark, {where: {id: req.params.id}}).then( (data) => {
            res.json(data)
        });
    });


    //Delete park
    router.delete("/api/park/:id", (req,res)=> {
        db.Park.destroy({where: {id: req.params.id}}).then((data) => {
            res.json(data)
        });
    });
};
