const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const apiKey = 'd24b633aec4e9133959571904224f1e0';

// Below line allows files in the public folder
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


// Post Request
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    request(url, function(err, response, body) {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, please try again'
            });
        } else {
            let weather = JSON.parse(body);
            if (weather.main !== undefined) {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {
                    weather: weatherText,
                    error: null
                });
            } else {
                res.render('index', {
                    weather: weather.main,
                    error: 'Error, please try again'
                });
            }
        }
    });
});


// Get Request
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});


// Listening
app.listen(3000, function () {
  console.log('Listening on port 3000!')
});