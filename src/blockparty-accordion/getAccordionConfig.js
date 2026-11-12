/**
 * Media query matching visitors who asked for less motion.
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Build the accordion front configuration.
 *
 * Disables the animation when the visitor prefers reduced motion. Never
 * forces `hasAnimation` to `true`, so a value already set to `false`
 * (e.g. by the `beapi_accordion_block_config` PHP filter) is preserved.
 *
 * @param {Object} config Base configuration (after the PHP filter).
 * @param {Object} win    Window-like object, defaults to the global window.
 * @return {Object} A new configuration object.
 */
export const getAccordionConfig = (
	config = {},
	win = typeof window !== 'undefined' ? window : undefined
) => {
	const result = { ...( config || {} ) };

	if ( typeof win?.matchMedia !== 'function' ) {
		return result;
	}

	if ( win.matchMedia( REDUCED_MOTION_QUERY )?.matches ) {
		result.hasAnimation = false;
	}

	return result;
};
