const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

// load main plugin file
const mainPhpFile = fs.readFileSync(path.join(process.cwd(), 'acf-autosize.php'), 'utf-8')

// extract meta comment
const comment = mainPhpFile.match(/\/\*([\s\S]*)\*\//m)
if (!comment) {
	console.log('Error reading main php file.')
	process.exit(0)
}

const commentHeader = `/*\n${comment[1].trim()}\n*/`

// load compiled js file
let autosizeJs = fs.readFileSync(path.join(process.cwd(), 'public', 'acf-autosize.js'), 'utf-8')

// escape $, single and double quotes
autosizeJs = autosizeJs
	.replace(/'/g, "\\'")
	.replace(/"/g, '\\"')
	.replace(/\$/g, '\\$')

// load handlebars template
const hbs = fs.readFileSync(path.join(process.cwd(), 'src', 'acf-autosize-mu.hbs'), 'utf-8')

// compile php file
const template = handlebars.compile(hbs)
const html = template({ autosizeJs, commentHeader })

// echo compilation
console.log(html)
