<?php
/*
Plugin Name: ACF Autosize
Plugin URI: https://wordpress.org/plugins/acf-autosize/
Description: A wordpress plugin to automatically resize and improve upon wysiwyg and textarea fields in Advanced Custom Fields
Version: 1.1.1
Author: Moritz Jacobs @ Yeah
Author URI: http://www.yeah.de
 */

namespace YeahACFAutosize;

class ACFAutosize {

	public $version = "1.1.1";

	public function __construct() {
		// enqueue javascript
		add_action('acf/input/admin_footer', array($this, "enqueue"));
	}

	public function enqueue() {
		wp_register_script('acf-autosize-js', plugins_url("public/acf-autosize.js", __FILE__), false, $this->version);
		wp_enqueue_script('acf-autosize-js');
	}
}

new ACFAutosize();
