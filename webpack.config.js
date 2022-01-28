/**
 * set your pathes here
 * "src" and "dist" should point at your root source and dist folder with leading "./"
 *
 * "scss", "js":
 * 'distChildFolder/filenameWithoutExtension': 'sourceChildFolder/filename'
 * - to merge several source files to one single dist file use wildcard like 'distChild/file': 'sourceChild/*[.ext]'
 *
 * "copy":
 * 'sourceChildFolder': 'distChildFolder'
 */
const tasks = {
	src: './src',
	dist: './public',

	scss: {
		'acf-autosize': 'scss/acf-autosize.scss'
	},
	js: {
		'/acf-autosize': 'js/index.js'
	},
	copy: {
		assets: 'assets'
	}
}

/**
 * no changes from here pls
 */
const path = require('path')
const fg = require('fast-glob')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const config = {
	mode: process.env.NODE_ENV,
	entry: {
		...Object.fromEntries(Object.entries(tasks.scss).map(([k, v]) => [k, tasks.src + '/' + v])),
		...Object.fromEntries(Object.entries(tasks.js).map(([k, v]) => [k, v.includes('*.') ? fg.sync('./' + path.join(tasks.src, v)) : './' + path.join(tasks.src, v)]))
	},
	output: {
		path: path.resolve(__dirname, tasks.dist),
		clean: true
	},
	target: ['web', 'es5'],
	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: { url: false } },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				]
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	optimization: {
		minimizer: [new ESBuildMinifyPlugin()]
	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin(),
		new CopyPlugin({
			patterns: Object.entries(tasks.copy).map(([k, v]) => { return { from: './' + path.join(tasks.src, k), to: v } })
		}),
		new WebpackNotifierPlugin()]
}

module.exports = (_env, argv) => {
	if (argv.mode === 'development') {
		config.devtool = 'source-map'
	}

	return config
}
