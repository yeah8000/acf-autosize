<?php
/*
Plugin Name: ACF Autosize
Plugin URI: https://wordpress.org/plugins/acf-autosize/
Description: A wordpress plugin to automatically resize and improve upon wysiwyg and textarea fields in Advanced Custom Fields.
Version: 2.0.15
Author: Yeah GbR
Author URI: https://yeah.de
 */

namespace YeahACFAutosize;

class ACFAutosize
{

	public $version = "2.0.15";

	public function __construct()
	{
		add_action('init', array($this, "enqueues"));
	}

	public function enqueues()
	{
		// enqueue scripts & styles in backend
		add_action('admin_head', array($this, "enqueueCSS"));
		add_action('admin_footer', array($this, "enqueueJS"));

		// enqueue scripts & styles in frontend
		if (apply_filters('acf-autosize/enabledInFrontend', false)) {
			add_action('wp_head', array($this, "enqueueCSS"));
			add_action('wp_footer', array($this, "enqueueJS"));
		}
	}

	public function enqueueCSS()
	{
		wp_register_style('acf-autosize-css', plugins_url("public/acf-autosize.css", __FILE__), false, $this->version);
		wp_enqueue_style('acf-autosize-css');
	}

	public function enqueueJS()
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
	}
}

new ACFAutosize();
