const express = require("express");
var router = express.Router()
const jwt = require("jsonwebtoken")

var User = require("../models/user");

var SECRET_KEY = "123456";

router.post("/", async (req, res) => {



    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send({ "Result": "Invalid credentials" });
    }
    else {

        if (user.password === req.body.password) {
            let token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);
            return res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });

        }
        else {


            return res.status(400).send({ "Result": "Invalid credentials" });

        }

    }

});


module.exports = router;