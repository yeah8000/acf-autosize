const autosize = require("autosize");

($ => {
	const textareas = $(".acf-field.autosize textarea");
	autosize(textareas);
})(jQuery);
