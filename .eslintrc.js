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
		'no-tabs': 0
	},
	globals: {
		ACFAutosize: false
	}
}