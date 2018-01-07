var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './javascript/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000',
	},
	module: {
		 rules: [
			 {
				 // test: /\.(js|jsx)$/,
				 // exclude: /node_modules/,
				 // use: [
					//  'babel-loader',
				 // ],
				 test: /.jsx?$/,
				 loader: 'babel-loader',
				 exclude: /node_modules/,
				 query: {
					 presets: ['es2015', 'react']
				 }
			 },
		 ],
 },
	plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
