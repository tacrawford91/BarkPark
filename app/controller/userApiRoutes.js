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

//Create New User - Sign up Form
router.post("/user", (req, res) => {
    db.User.create(req.body).then((dbPost) => {
        res.json(dbPost);
    })
});

//get users at certain park 
router.get("/user/park/:currentParkID", (req, res) => {
    db.User.findAll({ where: { currentParkID: req.params.currentParkID } }).then((data) => {
        res.json(data)
    });
});

//update users current park location
router.put("/user/park/:userID", (req, res) => {
    var updatedUser = {
        currentParkID: req.body.currentParkID
    }
db.User.update(updatedUser, {where:{id: req.params.userID }}).then((data) => {
    res.json(data)
});
});


//get Number of Likes/dislikes
router.get("/user/thumbs/:userID", (req, res) => {
    db.User.findOne({
        attributes: ['thumbsUp', 'thumbsDown']
      },{ where: { id: req.params.id } }).then((data) => {
        res.json(data)
    });
});


//Update Number of Likes/dislikes
router.put("/user/thumbs/:userID", (req, res) => {
    var updatedUser = {
        thumbsUp: req.body.thumbsUp,
        thumbsDown: req.body.thumbsDown 
    }
    db.User.update(updatedUser, {where:{id: req.params.userID }}).then((data) => {
        res.json(data)
    });
});



//Delete user
router.delete("/user/:id", (req,res)=> {
    db.User.destroy({where: {id: req.params.id}}).then((data) => {
        res.json(data)
    });
});

// Update user
// router.put("/user/:id", (req,res)=> {
//     // var io = req.io;
//     var updatedUser = {
//         user_name: req.body.user_name,
//         password: req.body.password,
//         email: req.body.email,
//         dog_name: req.body.dog_name,
//         dog_type: req.body.dog_type,
//         dog_color: req.body.dog_color,
//         dog_weight: req.body.dog_weight,
//         dog_rating: req.body.dog_rating
//     }
//     db.User.update(updatedUser, {where: {id: req.params.id}}).then( (data) => {
//         console.log(data);
//         req.app.io.emit('test1', {test:"please work"});
//         res.json(data)

//     });
// });


module.exports = router;