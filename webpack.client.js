const path = require('path');
const config = require('./webpack.base');
const merge = require('webpack-merge');


const clientConfig = {
	entry: './src/client',
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, 'public')
	},
	mode: 'development'
};

module.exports = merge(config, clientConfig);
