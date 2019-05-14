/*requiring express*/
var express = require('express');

/*instantiating an instance*/
var app = express();


/*Routes
respond index.hmtl when the user hits the homepage*/
app.get('/', function(req, res)
{
    res.send('this will be the homepage!');
});


/*Web server port to listen upon to*/
app.listen(3000);

git 