var express = require('express');
var router = express.Router();
var _ = require('underscore');

var UserModel = require('../models/user');
var ThreadCollection = require('../collections/thread');

router.post('/signup', function(req, res, next) {
  var user = new UserModel(req.body);
  user.save(function(err) {
    if (err) {
      var keys = Object.keys(err.errors);
      var errors = _.map(err.errors, function(obj, key) {
        return obj.message;
      });
      res.status(500).send(errors.join(', '));
    } else {
      var coll = new ThreadCollection({username: req.body.username, threads: []});
      coll.save(function(err) {
        if (err) {
          var keys = Object.keys(err.errors);
          var errors = _.map(err.errors, function(obj, key) {
            return obj.message;
          });
          res.status(500).send(errors.join(', '));
        } else {
          req.session.username = req.body.username;
          res.json({redirect: '/'});
        }
      });
    }
  });
});

router.post('/login', function(req, res, next) {
  UserModel.findOne({username: req.body.username}, function(err, user) {
    if (err || !user) {
      res.status(500).send('Username or password incorrect');
    } else {
      if (user.authenticate(req.body.password)) {
        req.session.username = req.body.username;
        res.json({redirect: '/'});
      } else {
        res.status(500).send('Username or password incorrect');
      }
    }
  });
});

router.post('/logout', function(req, res, next) {
  req.session.destroy();
  res.json({redirect: '/'});
});

module.exports = router;