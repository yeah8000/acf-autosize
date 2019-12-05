const autosize = require('autosize');

($ => {
	let textareas

	if (ACFAutosize.enabledByDefault) {
		textareas = $('.acf-field:not(.no-autosize) textarea')
	} else {
		textareas = $('.acf-field.autosize textarea')
	}

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
		let textarea = null
		if (ACFAutosize.enabledByDefault) {
			textarea = $el.find('.acf-field:not(.no-autosize) textarea')
		} else {
			textarea = $el.find('.acf-field.autosize textarea')
		}

		if (textarea.length > 0) {
			autosize(textarea)
		}
	})
})(window.jQuery)
