# Link-Shortener-API

A link-shortening service. 

This application is currently deployed through Heroku at the following URL: https://rocky-peak-76205.herokuapp.com

## Endpoints
__[POST] https://rocky-peak-76205.herokuapp.com/shorten:__
* request body contains a URL
* response contains shortened version if it doesn't already exist, with an appropriate error code if it already does

__[GET] https://rocky-peak-76205.herokuapp.com/shorten?url=http://google.com:__
* request body contains a URL
* response contains shortened URL if it already exists, returns appropriate error code if it doesn't exist

__[DELETE] https://rocky-peak-76205.herokuapp.com/shorten:__
* request args contain a URL
* response contains shortened version if it doesn't already exist, with an appropriate error code if it already does

These endpoints can alternatively be reached via localhost (ex. __[POST] localhost:XXXX/shorten:__ ) by cloning this repo and performing the following:

## Local Setup
```bash
$ npm install
$ npm run dev
```



__NOTE:__ The repo currently utilizes a MongoDB database hosted by mLab & requires environment variables in order to access this DB.
(ex. export MONGODB_URI=mongodb://[user]:[password]@ds035836.mlab.com:35836/linkshortener)

Feel free to contact me for help on how to set this up!
