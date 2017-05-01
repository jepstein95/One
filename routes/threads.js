var express = require('express');
var router = express.Router();
var _ = require('underscore');

var ThreadCollection = require('../collections/thread');

router.get('/', function(req, res, next) {
  ThreadCollection.findOne({username: req.session.username}, function(err, collection) {
    if (err || !collection) {
      res.status(500).send('An error occurred');
    } else {
      res.json(collection.threads);
    }
  });
});

router.put('/', function(req, res, next) {
  ThreadCollection.findOne({username: req.session.username}, function(err, collection) {
    if (err || !collection) {
      res.status(500).send('An error occurred');
    } else {
      collection.threads = req.body;
      collection.save(function(err) {
        if (err) {
          var keys = Object.keys(err.errors);
          var errors = _.map(err.errors, function(obj, key) {
            return obj.message;
          });
          res.status(500).send(errors.join(', '));
        } else {
          res.json(collection.threads);
        }
      });
    }
  });
});

module.exports = router;