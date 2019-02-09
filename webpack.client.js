const path = require('path');

module.exports = {
	entry: './src/client',
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			exclude: /node-modules/,
			options: {
				presets: ['react', 'stage-0', ['env', {
					targets: {
						browsers: ['last 2 versions']
					}
				}]]
			}
		}]
	},
	mode: 'development'
};
