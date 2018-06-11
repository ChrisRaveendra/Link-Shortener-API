"use strict";

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Urls = require('./models').Urls;

function hashURL(url) {
    var hash = crypto.createHash('sha256');
    hash.update(url);
    return hash.digest('hex');
}

// test endpoint
router.get('/create-test-url', function (req, res) {
    var url = new Urls({
        originalURL: 'I am an original url',
        shortURL: 'I am a short url'
    });
    url.save(function (err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send('Success: created a Urls object in MongoDb');
        }
    });
});

router.post('/shorten', function (req, res) {
        if(!req.body.url) {
            console.log('missing info');
            res.status(400).json('Please provide a URL');
            return;
        }

        let newUrl = hashURL(req.body.url).substr(0,10) + '.short';
        var url = new Urls({
            originalURL: req.body.url,
            shortURL: newUrl
        });

        let hashCode = function (s) {
            return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
        }

        console.log('hashcode: ', hashCode(req.body.url));
        console.log("hashurl: ", hashURL(req.body.url) )
        console.log('url: ', url);
        Urls.findOne({ originalURL: req.body.url }, function (err, result) {
            if(result) {
                console.log('URL already shortened');
                res.status(400).json('This URL has already been shortened, access it via a GET request');
                return;
            }

            url.save(function (err1) {
                if (err1) {
                    //Error 400 for Incomplete parameters or if URL already registered
                    if (!req.body.originalURL || !req.body.shortURL) {
                        console.log('missing info');
                        res.status(400).json(err1);
                        return;
                    }

                    console.log('here is what we are putting in as originalURL: ', req.body.url);
                    //check database for existing email
                    Urls.find({ originalURL: req.body.url }, function (err2, res2) {
                        if (res2) {
                            console.log('URL already shortened');

                            res.status(400).json('This URL has already been shortened, access it via a GET request');
                            return;
                        }

                        else {
                            console.log('weird error');
                            res.status(500).json(err2);
                            return;
                        }
                    });

                }

                else {
                    res.status(200);
                    res.send(`Success: created a URL: ${url.originalURL} ${url.shortURL}`);
                }
            });
        });

    });

router.get('/shorten', function (req,res) {
    Urls.findOne({originalURL: req.query.url}, function(err,result){
        if (!result) {
            res.send('cannot find this url')
        }
        else {
            res.send(result.shortURL);
        }
    })
})

router.delete('/shorten', function (req,res) {
    Urls.findOneAndRemove({ originalURL: req.query.url }, function (err, result) {
        if (!result) {
            console.log("Can't find matching URL to delete in Database", err);
            res.send(`failure to remove ${req.query.url}, URL not found`);
        }

        else {
            console.log('search successful!', res);

            res.send('delete successful');
        }
    });
})

router.get('/:shortURL', function (req, res) {
    Urls.findOne({ shortURL: req.params.shortURL }, function (err, result) {
        if (!result) {
            res.send(`We don't currently have this shortURL in out DB`)
        }
        else {
            res.send(`The link you provided: '${req.params.shortURL}' redirects to be the below link! \n${result.originalURL}`);
            // res.status(301).redirect(`${req.params.originalURL}`);
        }

    }); 
});

module.exports = router;
