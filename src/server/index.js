import express from 'express';
import {renderToString} from 'react-dom/server';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import Routers from './../Routers';


const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {

	const content = renderToString(
		(
			<StaticRouter location={req.path} context={{}}>{Routers}</StaticRouter>
		)
	);

	res.send(
		`<html>
	<header>
	<title>ssr-react</title>
	</header>
	<body>
	<div id="root">${content}</div></body>
	<script src="./index.js"></script>
	</html>
	`
	);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
