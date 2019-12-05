if (typeof acf !== 'undefined') {
	require('./textarea')
	require('./wysiwyg')
	if (ACFAutosize.enabledByDefault) {
		window.jQuery('body').addClass('acf-autosize-enabled')
	}
}
