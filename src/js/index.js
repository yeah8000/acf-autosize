if (typeof acf !== 'undefined') {
	require('./textarea')
	require('./wysiwyg')
	if (typeof ACFAutosize !== 'undefined' && ACFAutosize.enabledByDefault) {
		window.jQuery('body').addClass('acf-autosize-enabled')
	}
}
