var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ["babel-polyfill", './javascript/app.jsx'],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
		  'node_modules',
		  path.join(__dirname, 'src/scripts'),
		  path.join(__dirname, 'src')
		]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
			  	loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['react', 'es2015', "stage-0"],
		 			plugins: ['transform-class-properties']
				}
			},
			{
					test: /\.styl$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								hmr: false,
							},
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: '[name]_[local]-[hash:base64:3]',
								minimize: true,
							},
						},
						{
							loader: 'stylus-loader',
						},
					],
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				}
		],
 },
	plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
}
