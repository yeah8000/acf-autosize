# acf-autosize
A wordpress plugin to automatically resize and improve upon wysiwyg and textarea fields in Advanced Custom Fields

## Features
- Automatically resize wysiwyg and textarea fields in ACF groups
- Add `data-wysiwyg-slug='my-wysiwyg-field'` to the body in tinymce iframes, so you can style those iframe's contents using editor-styles:

```php
// functions.php

function yeah9346_dashboard_tinymce_editor_styles() {
	add_editor_style(get_stylesheet_directory_uri().'/path/to/css/editor-styles.css?v=123');
}
add_action('admin_init', 'yeah9346_dashboard_tinymce_editor_styles');

```

```css
/* editor-styles.css */

body[data-wysiwyg-slug="my-wysiwyg-field"] {
	...
}
```

- Set `min-height` of WYSIWYG-fields via `acf-autosize/wysiwyg/min-height`-filter. 

```php
// functions.php

add_filter('acf-autosize/wysiwyg/min-height', function() {
	return 200;
});

```

- Disable autosizing by default width `acf-autosize/enabledByDefault`-filter (is enabled by default).
  
```php
// functions.php

add_filter('acf-autosize/enabledByDefault', function() {
	return false;
});

```


## Usage
- Install and activate like any other wordpress plugin
- `[data-wysiwyg-slug]` is added to *every* wysiwyg field!
- The plugin is enabled by default on all textareas and wysiwyg fields. You can disable it by adding the class `no-autosize` to a field.
- You can set the the default behaviour to false via the `acf-autosize/enabledByDefault`-filter. After that you can reenable single fields by adding the class `autosize`.
- Set `min-height` of WYSIWYG-fields via `acf-autosize/wysiwyg/min-height`-filter. 


## mu-plugin
`acf-autosize-mu.php` is a single-file drop-in version of acf-autosize for usage in your theme or mu-plugins. It contains the javascript and is AUTOGENERATED!

## Development

- Install build tools: `npm install`
- Run dev watcher: `npm run dev`
- Distribution: `npm run dist`
- Compile mu-plugin: `npm run mu`
- deploy to wordpress.org: `npm run deploy your-username`

### Versions need a bump in:
- 2 × `acf-autosize.php`
- 1 × `package.json`
- 1 × `readme.txt` + Changelog!

… and don't forget to `npm run dist`