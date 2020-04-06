
module.exports = {

	clean: {
		enabled: 'dist',
		paths: ['./public/**/*.map', './src/tmp']
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
