var express = require('express')
var router = express.Router()

const jwt = require("jsonwebtoken")

var SECRET_KEY = "123456";
var Hero = require("../models/model");

let heroesArry = [
    {
        id: 1,
        name: "Rumesh",
        superPower: ["Fighting"],
        age: 24
    },

    {
        id: 2,
        name: "Kamal",
        superPower: ["Running"],
        age: 24
    },
    {
        id: 3,
        name: "Nimal",
        superPower: ["Flying"],
        age: 24
    },
    {
        id: 4,
        name: "Sunil",
        superPower: ["Fishing"],
        age: 24
    }
];



router.get('/', async (req, res) => {

    await Hero.find({}).then(heroList => {

        return res.status(200).send(heroList)

    }).catch(err => {

        console.error(err);
        return res.status(500).send(err);

    });

});

router.get('/:heroName', async (req, res) => {

    let heroName = req.params.heroName;

    await Hero.findOne({ name: heroName }).then(hero => {

        if (!hero) {

            return res.status(404).send({ Result: "Hero Not Found" });

        }

        return res.status(404).send(hero);

    }).catch(err => {

        console.error(err);
        return res.status(500).send(err);

    });
});


router.put('/:heroName', (req, res) => {

    let heroName = req.params.heroName;

    let NewName = req.body.name;
    //console.log(NewName);
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPowers = req.body.superPowers;
    if (!NewSuperPowers)
        return res.status(422).send({ InvalidInput: "superPowers Not Found in Request Body" });

    let NewBirthName = req.body.birthName;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "birth Name Not Found in Request Body" });

    let NewMovies = req.body.movies;
    if (!NewMovies)
        return res.status(422).send({ InvalidInput: "movies Not Found in Request Body" });

    Hero.findOne({ name: heroName }, (err, doc) => {

        doc.birthName = NewBirthName,
            doc.superPowers = NewSuperPowers,
            doc.deceased = false,
            doc.likeCount = 50,
            doc.movies = NewMovies
        doc.save().then(newHero => {

            res.status(200).send(newHero);

        }).catch(err => {

            console.error(err);
            return res.status(500).send(err);

        });
    });



});

router.post('/', async (req, res) => {

    //Access the custom header values
    const token = req.header("x-jwt-token");
    if (!token) {
        return res.send({ "Result": "Access denied" })
    }

    try {
        jwt.verify(token, SECRET_KEY)

        return res.status(200).send({ "Result": "Valid token" });

    } catch (error) {
        return res.status(400).send({ "Result": "Invalid token" });
    }



    let NewName = req.body.name;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPowers = req.body.superPowers;
    if (!NewSuperPowers)
        return res.status(422).send({ InvalidInput: "superPowers Not Found in Request Body" });

    let NewBirthName = req.body.birthName;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "birth Name Not Found in Request Body" });

    let NewMovies = req.body.movies;
    if (!NewMovies)
        return res.status(422).send({ InvalidInput: "movies Not Found in Request Body" });

    let ImageUrl = req.body.imgUrl;

    let heroToAdd = new Hero({
        name: NewName,
        birthName: NewBirthName,
        superPowers: NewSuperPowers,
        deceased: false,
        likeCount: 50,
        movies: NewMovies,
        imgUrl: ImageUrl
    });

    await heroToAdd.save().then(createdHero => {

        res.status(200).send(createdHero);

    }).catch(err => {

        console.error(err);
        return res.status(500).send(err);

    });

});


router.delete('/:heroName', (req, res) => {

    let heroName = req.params.heroName;

    Hero.deleteOne({ name: heroName }, (err, doc) => {
        if (!err) {
            return res.status(200).send(doc);
        }
    }).then(createdHero => {

        res.status(200).send(createdHero);

    }).catch(err => {

        console.error(err);
        return res.status(500).send(err);

    });


});

module.exports = router;