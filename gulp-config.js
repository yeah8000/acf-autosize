const imagemin = require('gulp-imagemin')
const browserlist = ['> 0.1%']

module.exports = {
	css: {
		scss: {
			config: {
				outputStyle: 'compressed' // nested, compact, expanded and compressed are available options
			}
		},

		sourcemaps: {
			enabled: 'dev'
		},

		autoprefixer: {
			enabled: true,
			config: {
				browserlist: browserlist
			}
		},

		cleanCss: {
			enabled: true,
			config: {
				compatibility: 'ie8'
			}
		}
	},

	js: {
		sourcemaps: {
			enabled: 'dev'
		},
		browserify: {
			enabled: true
		},

		babeljs: {
			enabled: true,
			config: {
				minified: true,
				comments: false,
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								browsers: browserlist
							}
						}
					]
				]
			}
		}
	},

	clean: {
		enabled: 'dist',
		paths: ['./public/**/*.map', './src/tmp']
	},

	images: {
		imagemin: {
			enabled: true,
			config: [
				imagemin.gifsicle({ interlaced: true }),
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({})
			]
		}
	},

	svg: {
		svgmin: {
			enabled: true,
			config: {}
		}
	},

	paths: {
		// "DESTINATION" : ['SOURCE']
		css: {
			'./public/': ['./src/scss/**/*.scss']
		},
		js: {
			'./public/acf-autosize.js': ['./src/js/index.js']
		},
		jsWatch: {
			0: ['./src/js/**/*.js']
		},
		jsConcat: {
		},
		images: {
			'./public/assets/': [
				'./src/assets/**/*.jpeg',
				'./src/assets/**/*.jpg',
				'./src/assets/**/*.png',
				'./src/assets/**/*.gif',
				'./src/assets/**/*.ico'
			]
		},
		svg: {
			'./public/assets/': ['./src/assets/**/*.svg']
		}
	},

	// All tasks above are available (css, js, images and svg)
	combinedTasks: {
		dist: ['js', 'images', 'svg', 'css', 'clean'],
		default: [['dist', 'watch']]
	},

	watchTask: {
		images: ['images'],
		svg: ['svg'],
		css: ['css'],
		jsWatch: ['js']
	}
}
