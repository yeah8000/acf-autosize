const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

// load compiled js file
let autosizeJs = fs.readFileSync(path.join(process.cwd(), "public", "acf-autosize.js"), "utf-8");

// escape $, single and double quotes
autosizeJs = autosizeJs.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\$/g, '\\$');

// load handlebars template
const hbs = fs.readFileSync(path.join(process.cwd(), "src", "acf-autosize-mu.hbs"), "utf-8");

// compile php file
const template = handlebars.compile(hbs);
const html = template({ autosizeJs });

// echo compilation
console.log(html);
