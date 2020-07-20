const autosize = require('autosize');

($ => {
	let textareas

	if (ACFAutosize.enabledByDefault) {
		textareas = $('.acf-field:not(.no-autosize) textarea')
	} else {
		textareas = $('.acf-field.autosize textarea')
	}

	autosize(textareas)

	// auto size text-areas on various occasions
	acf.add_action('ready load', () => {
		autosize.update(textareas)
	})

	acf.add_action('show_field', () => {
		// wait a moment until the field is really open
		setTimeout(() => {
			autosize.update(textareas)
		}, 750)
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
