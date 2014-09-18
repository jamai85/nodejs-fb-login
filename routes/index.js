var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Facebook Login' });
});

router.post('/user', function(req, res) {
    var accessToken = req.body.accessToken,
        https       = require('https');

    var options = {
        hostname: 'graph.facebook.com',
        port: 443,
        path: '/v2.1/me?fields=id,name,picture&access_token=' + accessToken,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        agent: false
    };

    var fbRequest = https.request(options, function(fbResponse) {
        var data = '';
        fbResponse.on('data', function(chunk) {
            console.log(chunk);
            data += chunk;
        });

        fbResponse.on('end', function() {
            res.end(data);
            console.log(data);
        })
    });

    fbRequest.end();

    fbRequest.on('error', function(e) {
        console.error(e);
        res.end(JSON.stringify({'error': true}));
    });
});

module.exports = router;
