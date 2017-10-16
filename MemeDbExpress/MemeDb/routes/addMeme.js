var express = require('express');
var router = express.Router();

/* GET meme listing. */
router.get('/', function(req, res, next) {
  res.render('addMeme')
});

module.exports = router;
