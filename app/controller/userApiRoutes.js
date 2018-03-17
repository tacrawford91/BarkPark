//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");



//Get single user
router.get("/user/:id", (req, res) => {
    db.User.findOne({ where: { id: req.params.id } }).then((data) => {
        res.json(data)
    });
});

//Get all users
router.get("/allusers", (req, res) => {
    db.User.findAll({}).then((data) => {
        res.json(data);
    });
});

//Create New User
router.post("/user", (req, res) => {
    console.log(req.body);
    console.log("hello t & L")
    db.User.create(req.body).then((dbPost) => {
        res.json(dbPost);
    });
});

// Update user
router.put("/user/:id", (req,res)=> {
    var updatedUser = {
        user_name: req.body.user_name,
        password: req.body.password,
        email: req.body.email,
        dog_name: req.body.dog_name,
        dog_type: req.body.dog_type,
        dog_color: req.body.dog_color,
        dog_weight: req.body.dog_weight,
        dog_rating: req.body.dog_rating
    }
    db.User.update(updatedUser, {where: {id: req.params.id}}).then( (data) => {
        console.log(data);
        res.json(data)
    });
});


//Delete user
router.delete("/user/:id", (req,res)=> {
    db.User.destroy({where: {id: req.params.id}}).then((data) => {
        res.json(data)
    });
});


module.exports = router;