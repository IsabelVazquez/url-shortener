const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const urlSchema = require('./models/shortUrl.js');

//connect to our db (MONGODB_URI)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shortUrls');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/new/:url(*)', function (req, res) {
    var urlToShorten = req.params.url;
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    if(regex.test(urlToShorten) === true) {
        var short = Math.floor(Math.random()*100000).toString();
        //potential document
        var data = new urlSchema({
            originalUrl: urlToShorten,
            shorterUrl: short
        }).save(function (err) {
            if (err) {
                return res.send('Error saving to database');
            }
        });
        
        return res.json({
            originalUrl: urlToShorten,
            shorterUrl: short
        });
    }
    return res.json({'urlToShorten': 'Failed'});
});

//redirect
app.get('/:urlToForward', function (req, res) {
    var shorterUrl = req.params.urlToForward;
    urlSchema.findOne({'shorterUrl': shorterUrl}, function (err, data) {
        if (err) {
            return res.send('Error reading the database');
        }
        var re = new RegExp('^(http|https)://', 'i');
        var strCheck = data.originalUrl;
        if(re.test(strCheck)) {
            res.redirect(301, data.originalUrl);
        }
        else {
            res.redirect(301, 'http://' + data.originalUrl);
        }
    });
});


app.listen(process.env.PORT, function (){
    console.log('Listening on port.');
})