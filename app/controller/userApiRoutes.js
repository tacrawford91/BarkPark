// 
//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");



//Get single user
router.get("/api/user/:id", (req, res) => {
    db.Park.findOne({ where: { id: req.params.id } }).then((data) => {
        res.json(data)
    });
});

//Get all users
router.get("/api/allusers", (req, res) => {
    db.Park.findAll({}).then((data) => {
        res.json(data);
    });
});

//Create New User
router.post("/api/user", (req, res) => {
    db.Park.create(req.body).then((dbPost) => {
        res.json(dbPost);
    });
});

// Update Park
// router.put("/api/park/:id", (req, res) => {
//     var updatedPark = {
//         park_Name: req.body.park_Name,
//         address: req.body.address
//     }
//     db.Park.update(updatedPark, { where: { id: req.params.id } }).then((data) => {
//         res.json(data)
//     });
// });


// //Delete park
// router.delete("/api/park/:id", (req, res) => {
//     db.Park.destroy({ where: { id: req.params.id } }).then((data) => {
//         res.json(data)
//     });
// });


// *********************************************************************************
// // api-routes.js - this file offers a set of routes for displaying and saving data to the db
// // *********************************************************************************

// // Dependencies
// // =============================================================

// // Grabbing our models

// var db = require("../models");

// // Routes
// // =============================================================
// module.exports = function (app) {

//     // GET route for getting all of the users
//     app.get("/api/user/:id", function (req, res) {

//     });

//     // POST route for saving a new user. You can create a user using the data on req.body
//     app.post("/api/user", function (req, res) {

//     });

//     // DELETE route for deleting todos. You can access the todo's id in req.params.id
//     app.delete("/api/todos/:id", function (req, res) {

//     });

//     // PUT route for updating todos. The updated todo will be available in req.body
//     app.put("/api/todos", function (req, res) {

//     });
// };