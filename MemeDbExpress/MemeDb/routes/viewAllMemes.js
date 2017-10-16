var express = require('express');
var router = express.Router();

/* GET viewAll page. */
router.get('/', function(req, res, next) {
  res.render('viewAllMemes', { memesCollection: '' });
});

module.exports = router;
