const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

/*app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/index.html');
});*/

app.get('/:urlToShorten(*)', function (req, res) {
  var urltoShorten = req.params.urlToShorten;
  res.json({"urlToShorten" : urltoShorten})
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})