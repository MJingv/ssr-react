const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const config = require('./webpack.base');


const serverConfig = {
	target: 'node',
	entry: './src/server/index.js',
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, 'build')
	},
	externals: [nodeExternals()],
	module: {
		rules: [{
			test: /\.css$/,
			use: ['isomorphic-style-loader', {
				loader: 'css-loader',
				options: {
					modules: true,
					localIdentName: '[name]_[hash:base64:5]',
					importLoaders: 1
				}
			},
			]
		}
		]
	}
};

module.exports = merge(config, serverConfig);
