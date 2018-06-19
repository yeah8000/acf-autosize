/**
 * set the editor wrapper height to it's content height
 * @param {[object]} editor tinymce editor object
 * @param  {Number} minHeight minimal height for the editor
 * @return void
 */
function editorAutoHeight(editor, minHeight = 200) {
	let height =
		$(editor.iframeElement)
			.contents()
			.find("html")
			.height() || minHeight;
	height = height < minHeight ? minHeight : height;
	$(editor.iframeElement).css("height", height);
}

/**
 * acf.tinymce hook
 */
acf.add_action("wysiwyg_tinymce_init", (editor, id, options, $field) => {
	const eventHandler = () => {
		editorAutoHeight(editor);
	};

	// check for "autosize" class on the field
	const doAutosize = $field.hasClass("autosize");
	if (!doAutosize) {
		return;
	}

	editor.on("init", eventHandler);
	editor.on("change", eventHandler);
	$(window).resize(eventHandler);
});
