const path = require('path');
const config = require('./webpack.base');
const merge = require('webpack-merge');


const clientConfig = {
	entry: './src/client',
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [{
			test: /\.css?$/,
			use: ['style-loader', {
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: true,
					localIdentName: '[name]_[hash:base64:5]'
				}
			}]
		}]
	}

};

module.exports = merge(config, clientConfig);
