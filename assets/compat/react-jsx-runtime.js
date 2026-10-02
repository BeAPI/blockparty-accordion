/**
 * Minimal `react-jsx-runtime` shim for WordPress versions before 6.6.
 *
 * @package blockparty-accordion
 */

( function () {
	if ( typeof window.wp === 'undefined' || typeof window.wp.element === 'undefined' ) {
		return;
	}

	const { createElement, Fragment } = window.wp.element;

	window.ReactJSXRuntime = {
		Fragment,
		jsx: createElement,
		jsxs: createElement,
	};
}() );
