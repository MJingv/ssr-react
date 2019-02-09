import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Routers from '../Routers';

import React from 'react';

export const render = (req) => {
	const content = renderToString(
		(
			<StaticRouter location={req.path} context={{}}>{Routers}</StaticRouter>
		)
	);

	const helmet = Helmet.renderStatic();

	return `<html>
	<header>
	${helmet.title.toString()}
	${helmet.meta.toString()}
	</header>
	<body>
	<div id="root">${content}</div></body>
	<script src="./index.js"></script>
	</html>
	`;

};
