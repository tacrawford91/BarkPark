//require express & setup Router
var express = require("express");
var router = express.Router();
// Requiring models
var db = require("../models");
var passport = require("../config/passport")
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
    db.User.create(req.body).then(function() {
        res.redirect(307, "/api/userLogin");
    }).catch(function(err) {
        console.log(err);
        res.json(err);
        res.status(422).json(err.errors[0].message);
    });
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
    db.User.update(updatedUser, { where: { id: req.params.userID } }).then((data) => {
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
router.delete("/user/:id", (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).then((data) => {
        res.json(data)
    });
});

//check user account
router.post("/userLogin", passport.authenticate("local"), function(req, res) {
    res.json("/members")
});

// router.post("/user", function(req, res) {
//     console.log(req.body);
//     db.User.create({
//         email: req.body.email,
//         password: req.body.password
//     }).then(function() {
//         res.redirect(307, "/userLogin");
//     }).catch(function(err) {
//         console.log(err);
//         res.json(err);
//         res.status(422).json(err.errors[0].message);
//     });
// });

// Route for logging user out
// app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
// });

// Route for getting some data about our user to be used client side
// app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//         // The user is not logged in, send back an empty object
//         res.json({});
//     } else {
//         // Otherwise send back the user's email and id
//         // Sending back a password, even a hashed password, isn't a good idea
//         res.json({
//             email: req.user.email,
//             id: req.user.id
//         });
//     }
// });



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