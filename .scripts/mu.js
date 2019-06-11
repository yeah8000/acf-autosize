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
let autosizeCss = fs.readFileSync(path.join(process.cwd(), 'public', 'acf-autosize.css'), 'utf-8')

// escape $ and double quotes
// do not escape single quotes, as this leads to a "invalid escape sequence" - error
autosizeJs = autosizeJs
	.replace(/"/g, '\\"')
	.replace(/\$/g, '\\$')

// escape $ and double quotes
autosizeCss = autosizeCss
	.replace(/'/g, "\\'")
	.replace(/"/g, '\\"')
	.replace(/\$/g, '\\$')

// load handlebars template
const hbs = fs.readFileSync(path.join(process.cwd(), 'src', 'acf-autosize-mu.hbs'), 'utf-8')

// compile php file
const template = handlebars.compile(hbs)
const html = template({ autosizeJs, autosizeCss, commentHeader })

// echo compilation
console.log(html)
