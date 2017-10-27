const express = require('express')
const router = express.Router()
const Genre = require('./../models/GenreSchema')

router
    .get('/', function (req, res, next) {
        res.render('addGenre')
    })
    .post('/', function (req, res, next) {
        let objParams = req.body;
        
        Genre.create(objParams).then((obj) => {
            console.log(obj);

            res.render('addGenre', {status: true})
        })
    });

module.exports = router