const express = require('express');
const app = express();
const Home = require('./components/Home');

app.get('/', function (req, res) {
	res.send(`<h1>hello world form jehol</h1>`);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
