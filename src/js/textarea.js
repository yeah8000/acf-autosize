const autosize = require('autosize');

($ => {
	const textareas = $('.acf-field.autosize textarea')
	autosize(textareas)

	// safety first: update on ready and load.
	$(document).ready(() => {
		autosize.update(textareas)
	})
	$(window).on('load', () => {
		autosize.update(textareas)
	})

	// init autosize on newly created repeater/flexcontent fields
	acf.add_action('append', function ($el) {
		let textarea = $el.find('.acf-field.autosize textarea')
		autosize(textarea)
	})
})(window.jQuery)
