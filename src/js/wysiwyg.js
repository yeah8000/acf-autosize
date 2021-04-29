const autosize = require('autosize');

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
	 * @param {object} field the acf field as a jQuery object
	 */
	function addSlugAttr (field) {
		const name = field.attr('data-name')
		const body = $('iframe', field)
			.contents()
			.find('body')

		body.attr('data-wysiwyg-slug', name)
	}

	/**
	 * acf.tinymce hook
	 */

	acf.addAction('wysiwyg_quicktags_init', (ed, id, mceInit, field) => {
		autosize(field.$el.find('textarea.wp-editor-area'))
	})

	acf.addAction('wysiwyg_tinymce_init', (ed, id, mceInit, field) => {
		const setAutoHeight = () => {
			editorAutoHeight(ed, ACFAutosize.wysiwyg.minHeight)
		}

		// add a slug class on all wysiwyg fiulds (for editor-styles.css)
		ed.on('init', () => {
			addSlugAttr(field.$el)
		})

		// check for "autosize" class on the field
		let doAutosize = false

		if (ACFAutosize.enabledByDefault) {
			doAutosize = !field.$el.hasClass('no-autosize')
		} else {
			doAutosize = field.$el.hasClass('autosize')
		}
		if (!doAutosize) {
			return
		}

		/**
		 * set height on various occasions
		 */
		ed.on('init', setAutoHeight)
		ed.on('change', setAutoHeight)

		acf.addAction('load resize', () => {
			setAutoHeight()
		})

		acf.addAction('show_field', (field) => {
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
