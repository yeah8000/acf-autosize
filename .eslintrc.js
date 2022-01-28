module.exports = {
	extends: 'standard',
	env: {
		browser: true
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: ['error', 'tab'],
		'no-console': ['warn'],
		'no-tabs': 0,
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'never'
		],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'none',
					requireLast: true
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false
				}
			}
		]

	},
	plugins: [
		'@typescript-eslint'
	],

	globals: {
		ACFAutosize: false,
		acf: false,
		jQuery: false,
		$: false,
	}
}