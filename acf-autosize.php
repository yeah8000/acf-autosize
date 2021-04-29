<?php
/*
Plugin Name: ACF Autosize
Plugin URI: https://wordpress.org/plugins/acf-autosize/
Description: A wordpress plugin to automatically resize and improve upon wysiwyg and textarea fields in Advanced Custom Fields.
Version: 2.0.9
Author: Yeah GbR
Author URI: https://www.yeah.de
 */

namespace YeahACFAutosize;

class ACFAutosize
{

	public $version = "2.0.9";

	public function __construct()
	{
		// enqueue javascript
		add_action('admin_footer', array($this, "enqueue"));
	}

	public function enqueue()
	{
		wp_register_script('acf-autosize-js', plugins_url("public/acf-autosize.js", __FILE__), false, $this->version);
		wp_enqueue_script('acf-autosize-js');

		// make the min-height of WYSIWYG fields filterable
		// enable autosizing by default
		$js_settings = array(
			'wysiwyg' => array(
				'minHeight' => apply_filters('acf-autosize/wysiwyg/min-height', 200)
			),
			'enabledByDefault' => apply_filters('acf-autosize/enabledByDefault', true)
		);

		wp_localize_script('acf-autosize-js', 'ACFAutosize', $js_settings);

		wp_register_style('acf-autosize-css', plugins_url("public/acf-autosize.css", __FILE__), false, $this->version);
		wp_enqueue_style('acf-autosize-css');
	}
}

new ACFAutosize();
