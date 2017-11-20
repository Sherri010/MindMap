var webpack = require('webpack');
var path = require('path');

module.export = {
	entry: './assets/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
			},
		]
	}
	
}