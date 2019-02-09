import express from 'express';
import Home from './components/Home';
import {renderToString} from 'react-dom/server';
import React from 'react';

const content = renderToString(<Home/>);
const app = express();

app.get('/', function (req, res) {
	res.send(
		`
	<html>
	<header>
	<title>ssr-react</title>
	</header>
	<body>${content}</body>
	</html>
	`
	);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
