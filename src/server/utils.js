import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Routers from '../Routers';
import React from 'react';

export const render = (req) => {
	const content = renderToString(
		(
			<StaticRouter location={req.path} context={{}}>{Routers}</StaticRouter>
		)
	);

	return `<html>
	<header>
	<title>ssr-react</title>
	</header>
	<body>
	<div id="root">${content}</div></body>
	<script src="./index.js"></script>
	</html>
	`;

};
