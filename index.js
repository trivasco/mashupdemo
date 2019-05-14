/*requiring express and other dependencies*/
var express = require('express');
var path = require('path');
var https = require('https');
var qlikauth = require('qlik-auth');


/*instantiating an instance*/
var app = express();

/*defining middleware for static pages*/
app.use(express.static(path.join(__dirname, 'public')));

/*Routes
respond index.hmtl when the user hits the homepage*/


app.get('/', function(req, res)
{
    res.send('this will be the homepage!');
});


  /*Web server port to listen upon to*/
app.listen(3000);