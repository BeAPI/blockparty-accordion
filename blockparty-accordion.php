<?php
/**
 * Plugin Name:       Blockparty Accordion
 * Description:       Accessible Accordion block for WordPress editor.
 * Requires at least: 6.2
 * Requires PHP:      8.1
 * Version:           1.0.6
 * Author:            Be API Technical team
 * Author URI:        https://beapi.fr
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockparty-accordion
 * Domain Path:       /languages
 */

namespace Blockparty\Accordion;

define( 'BLOCKPARTY_ACCORDION_VERSION', '1.0.6' );
define( 'BLOCKPARTY_ACCORDION_URL', plugin_dir_url( __FILE__ ) );
define( 'BLOCKPARTY_ACCORDION_DIR', plugin_dir_path( __FILE__ ) );
define( 'BLOCKPARTY_ACCORDION_PLUGIN_DIRNAME', plugin_basename( __FILE__ ) );

function init(): void {
	// Load available translations.
	load_plugin_textdomain( 'blockparty-accordion', false, dirname( BLOCKPARTY_ACCORDION_PLUGIN_DIRNAME ) . '/languages' );

	register_block_type( __DIR__ . '/build/blockparty-accordion' );
	register_block_type( __DIR__ . '/build/blockparty-accordion-item' );
	register_block_type( __DIR__ . '/build/blockparty-accordion-summary' );
	register_block_type( __DIR__ . '/build/blockparty-accordion-panel' );

	// Load translations for JS
	wp_set_script_translations( 'blockparty-accordion-summary-editor-script', 'blockparty-accordion', BLOCKPARTY_ACCORDION_DIR . '/languages' );

	// Pass PHP values to main script
	$constants = [
		'accordionConfig' => apply_filters(
			'beapi_accordion_block_config',
			[
				'allowMultiple'   => true,
				'closedDefault'   => true,
				'forceExpand'     => false,
				'hasAnimation'    => true,
				'openMultiple'    => false,
				'panelSelector'   => '.wp-block-blockparty-accordion-panel',
				'prefixId'        => 'block-accordion',
				'triggerSelector' => '.wp-block-blockparty-accordion-trigger',
			]
		),
	];
	wp_localize_script( 'blockparty-accordion-view-script', 'beapiAccordionBlock', $constants );

	do_action( 'blockparty_accordion_init' );
}

/**
 * Include additional aria attributes in KSES.
 *
 * @param array $tags
 * @param string $context
 *
 * @return array
 */
function allow_aria_attributes( $tags, $context ) {

	if ( 'post' === $context ) {
		$tags['button']['aria-expanded'] = [];
	}

	return $tags;
}

add_action( 'init', __NAMESPACE__ . '\\init' );
add_filter( 'wp_kses_allowed_html', __NAMESPACE__ . '\\allow_aria_attributes', 10, 2 );
