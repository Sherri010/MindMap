var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './javascript/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000',
	},
	// module: {
	// 	rules: [
	// 		{
	// 			use: 'babel-loader',
	// 			test: /\.js$/,
	// 		},
	// 	]
	// },
	devServer: {
		// historyApiFallback: true,
	  // port: 3000,
		// publicPath: '/dist/',
	},
	// watch: true,
}
