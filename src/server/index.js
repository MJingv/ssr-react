import express from 'express';
import {render} from './utils';
import proxy from 'express-http-proxy';

const app = express();

app.use(express.static('public'));


app.use('/api', proxy('www.google.com'));

app.get('*', function (req, res) {
	res.send(render(req));
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
