const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/public'));

//having issues with this 
app.get('/new/:urlToShorten', function (res, req) {
    var urlToShorten = req.params.urlToShorten;
    return res.send({'urlToShorten': urlToShorten});
})

app.listen(process.env.PORT || 8080, function (){
    console.log('Listening on port 8080.');
})