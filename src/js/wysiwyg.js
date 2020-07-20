($ => {
	/**
	 * set the editor wrapper height to it's content height
	 * @param {[object]} editor tinymce editor object
	 * @param  {Number} minHeight minimal height for the editor
	 * @return void
	 */
	function editorAutoHeight (editor, minHeight = 200) {
		let height =
			$(editor.iframeElement)
				.contents()
				.find('html')
				.height() || minHeight
		height = height < minHeight ? minHeight : height
		$(editor.iframeElement).css({
			height: height,
			minHeight: minHeight
		})
	}

	/**
	 * add the acf field's name slug a data-attribute to the iframe body
	 * @param {object} $field the acf field as a jQuery object
	 */
	function addSlugAttr ($field) {
		const name = $field.attr('data-name')
		const body = $('iframe', $field)
			.contents()
			.find('body')

		body.attr('data-wysiwyg-slug', name)
	}

	/**
	 * acf.tinymce hook
	 */
	acf.add_action('wysiwyg_tinymce_init', (editor, id, options, $field) => {
		const setAutoHeight = () => {
			editorAutoHeight(editor, ACFAutosize.wysiwyg.minHeight)
		}

		// add a slug class on all wysiwyg fiulds (for editor-styles.css)
		editor.on('init', () => {
			addSlugAttr($field)
		})

		// check for "autosize" class on the field
		let doAutosize = false

		if (ACFAutosize.enabledByDefault) {
			doAutosize = !$field.hasClass('no-autosize')
		} else {
			doAutosize = $field.hasClass('autosize')
		}
		if (!doAutosize) {
			return
		}

		/**
		 * set height on various occasions
		 */
		editor.on('init', setAutoHeight)
		editor.on('change', setAutoHeight)

		acf.add_action('load resize', () => {
			setAutoHeight()
		})

		acf.add_action('show_field', () => {
			// wait a moment until the field is really open
			setTimeout(() => {
				setAutoHeight()
			}, 750)
		})

		// wait a moment until all controls are loaded, fonts are loaded and resize again
		setTimeout(() => {
			setAutoHeight()
		}, 1000)
	})
})(window.jQuery)
