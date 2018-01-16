var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// todo 'react-hot',
module.exports = {
	entry: './javascript/index.jsx',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000',
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
			  loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['react', 'es2015']
				}
			},
			// {
			//   test: /\.css$/,
			//   loader: 'style-loader'
			// }, {
			//   test: /\.css$/,
			//   loader: 'css-loader',
			//   query: {
			//     modules: true,
			//     localIdentName: '[name]__[local]___[hash:base64:5]'
			//   }
			// },
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
		]
 },
	plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
}
