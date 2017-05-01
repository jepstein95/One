var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.username) res.render('index');
  else res.render('splash');
});

module.exports = router;
