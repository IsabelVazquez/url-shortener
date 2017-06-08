const express = require('express')
const app = express()

app.route('/').get(function(req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

/*app.get('/', function (req, res) {
  res.send('Hello World!')
})*/

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})