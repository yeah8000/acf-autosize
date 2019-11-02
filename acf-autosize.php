<?php
/*
Plugin Name: ACF Autosize
Plugin URI: https://wordpress.org/plugins/acf-autosize/
Description: A wordpress plugin to automatically resize and improve upon wysiwyg and textarea fields in Advanced Custom Fields. <strong>Please note: Version 2 will automatically apply autosize to all fields. It will be possible to deactivate autosizing via class though.</strong>
Version: 1.3.2
Author: Moritz Jacobs @ Yeah
Author URI: https://www.yeah.de
 */

namespace YeahACFAutosize;

class ACFAutosize {

	public $version = "1.3.2";

	public function __construct() {
		// enqueue javascript
		add_action('acf/input/admin_footer', array($this, "enqueue"));
	}

	public function enqueue() {
		wp_register_script('acf-autosize-js', plugins_url("public/acf-autosize.js", __FILE__), false, $this->version);
		wp_enqueue_script('acf-autosize-js');

		$js_settings = array(
			'wysiwyg' => array(
				// make the min-height of WYSIWYG fields filterable:
				'minHeight' => apply_filters('acf-autosize/wysiwyg/min-height', 200),
			),
		);

		wp_localize_script('acf-autosize-js', 'ACFAutosize', $js_settings);

		wp_register_style('acf-autosize-css', plugins_url("public/acf-autosize.css", __FILE__), false, $this->version);
		wp_enqueue_style('acf-autosize-css');
	}
}

new ACFAutosize();
