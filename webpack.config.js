const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	style: path.join(__dirname, 'style/main.scss')
};


const common = {
	entry: {
		app: PATHS.app,
		style: PATHS.style
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.scss']
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?cacheDirectory'],
				include: PATHS.app
			}
		]
	},
	sassLoader: {
		includePaths: [path.resolve(__dirname, 'node_modules')]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'node_modules/html-webpack-template/index.ejs',
			title: 'Kanban App',
			appMountId: 'app',
			inject: false
		}),
		new CleanPlugin([PATHS.build])
	]
};

// Default config
if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',

			// host and port are from env
			host: process.env.HOST,
			port: process.env.PORT
		},
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loaders: ['style', 'css', 'sass'],
					include: PATHS.style
				},
				{
					test: /\.css$/,
					loaders: ['style', 'css'],
					include: PATHS.style
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
				save: true
			})
		]
	});
}

if (TARGET === 'build' || TARGET === 'stats') {
	module.exports = merge(common, {
		entry: {
			vendor: Object.keys(pkg.dependencies).filter(function (v) {
				// exclude alt-utils
				return v !== 'alt-utils';
			})
		},
		output: {
			path: PATHS.build,
			filename: '[name].[chunkhash].js',
			chunkFilename: '[chunkhash].js'
		},
		module: {
			loaders: [{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			}]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': '"production"'
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest']
			}),
			new ExtractTextPlugin('[name].[chunkhash].css')
		]
	});
}
