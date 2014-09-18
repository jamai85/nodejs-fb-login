var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Facebook Login' });
});

router.post('/user', function(req, res) {
    var accessToken = req.body.accessToken,
        userId      = req.body.UserID;

    res.end(JSON.stringify(req.body));
});

module.exports = router;
