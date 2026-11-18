/**
 * Build the front-end accordion configuration.
 *
 * Animation is turned off when the visitor asked for reduced motion. This runs
 * after the PHP `beapi_accordion_block_config` filter, so it can only disable
 * the animation, never re-enable it.
 *
 * @param {Object} baseConfig Configuration provided by PHP.
 * @return {Object} Configuration to pass to Accordion.init().
 */
export const getAccordionConfig = ( baseConfig = {} ) => {
	const config = { ...baseConfig };

	if (
		typeof window !== 'undefined' &&
		typeof window.matchMedia === 'function' &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
	) {
		config.hasAnimation = false;
	}

	return config;
};
