const express = require("express");
var router = express.Router()

var User = require("../models/user");

router.post("/", async (req, res) => {

    let createdUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    createdUser = await createdUser.save().then(() => {
        return res.send({
            username: createdUser.username,
            email: createdUser.email
        });
    }).catch(err => {
        console.log(err);
    })

});


module.exports = router;