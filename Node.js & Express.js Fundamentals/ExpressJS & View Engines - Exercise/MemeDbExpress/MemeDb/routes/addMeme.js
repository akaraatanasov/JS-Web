var express = require('express');
var router = express.Router();

const Genre = require('./../models/GenreSchema')
/* GET meme listing. */
router
  .get('/', function(req, res, next) {
    Genre.find({}).then(foundGenres => {
      let tags = []

      for (let genre of foundGenres) {
        tags.push(genre)
      }
    })
    
    res.render('addMeme')
}).post('/', (req, res, next) => {
  console.log(req.files)
})

module.exports = router;