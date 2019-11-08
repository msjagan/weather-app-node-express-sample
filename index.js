const request = require('request');
const argv = require('yargs').argv;

let apiKey = 'd24b633aec4e9133959571904224f1e0';
let city = argv.c || 'chennai';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`


request(url, function (err, response, body) {
	if (err) {
		console.log('error', err)
	} else {
		weather = JSON.parse(body);
		console.log(weather.main)
	}
});