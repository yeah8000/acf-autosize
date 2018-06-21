const imagemin = require("gulp-imagemin");
const browserlist = ["> 0.1%"];

module.exports = {
	css: {
		scss: {
			config: {
				outputStyle: "compressed" // nested, compact, expanded and compressed are available options
			}
		},

		sourcemaps: {
			enabled: "dev"
		},

		autoprefixer: {
			enabled: true,
			config: {
				browsers: browserlist
			}
		},

		cleanCss: {
			enabled: true,
			config: {
				compatibility: "ie8"
			}
		}
	},

	js: {
		sourcemaps: {
			enabled: "dev"
		},
		browserify: {
			enabled: false
		},

		babeljs: {
			enabled: true,
			config: {
				minified: true,
				comments: false
			}
		}
	},

	es6: {
		sourcemaps: {
			enabled: "dev"
		},
		browserify: {
			enabled: true
		},

		babeljs: {
			enabled: true,
			config: {
				minified: false,
				presets: [
					[
						"env",
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
		enabled: "dist",
		paths: ["./public/**/*.map", "./src/tmp"]
	},

	images: {
		imagemin: {
			enabled: true,
			config: [
				imagemin.gifsicle({ interlaced: true }),
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({ plugins: [{ removeViewBox: true }] })
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
			"./public/css/": ["./src/scss/**/*.scss"]
		},
		es6: {
			"./src/tmp/es6-bundle.js": ["./src/js/index.js"]
		},
		es6Watch: {
			"./src/tmp/es6-bundle.js": ["./src/js/**/*.js"]
		},
		js: {
			"./public/acf-autosize.js": [
				"./src/tmp/es6-bundle.js"
			]
		},
		images: {
			"./public/assets/": [
				"./src/assets/**/*.jpeg",
				"./src/assets/**/*.jpg",
				"./src/assets/**/*.png",
				"./src/assets/**/*.gif"
			]
		},
		svg: {
			"./public/assets/": ["./src/assets/**/*.svg"]
		},
		copy: {
			"./public/fonts/": ["./src/fonts/**/*.*"],
			"./public/favicons/": ["./src/favicons/**/*.*"]
		}
	},

	// All tasks above are available (css, js, images and svg)
	combinedTasks: {
		default: [["dist", "watch"]],
		dist: ["es6", "js", "images", "svg", "css", "copy", "clean"],
	},

	watchTask: {
		images: ["images"],
		svg: ["svg"],
		css: ["css"],
		es6Watch: ["es6"],
		js: ["js"],
		copy: ["copy"]
	}
};
