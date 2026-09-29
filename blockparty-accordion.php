<?php
/**
 * Plugin Name:       Blockparty Accordion
 * Description:       Accessible Accordion block for WordPress editor.
 * Requires at least: 6.2
 * Requires PHP:      8.1
 * Version:           1.3.2
 * Author:            Be API Technical team
 * Author URI:        https://beapi.fr
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockparty-accordion
 * Domain Path:       /languages
 */

namespace Blockparty\Accordion;

define( 'BLOCKPARTY_ACCORDION_VERSION', '1.3.2' );
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
	wp_set_script_translations( 'blockparty-accordion-editor-script', 'blockparty-accordion', BLOCKPARTY_ACCORDION_DIR . '/languages' );
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
 * Default icon blocks allowed inside accordion summaries.
 *
 * `core/icon` ships in WordPress 7.0+. Legacy Blockparty / BeAPI icon blocks
 * remain in the default list so icons keep working on the required 6.2+ range
 * whenever those plugins are active. The editor keeps only registered names.
 */
const BLOCKPARTY_ACCORDION_DEFAULT_ICON_BLOCKS = [
	'core/icon',
	'blockparty/icon',
	'beapi/icon-block',
];

/**
 * Returns the icon block names allowed inside accordion summaries.
 *
 * @return string[] Block names (e.g. `core/icon`).
 */
function get_allowed_icon_blocks(): array {
	/**
	 * Filters the icon block types allowed inside accordion summaries.
	 *
	 * Defaults prefer `core/icon` (WordPress 7.0+) and include
	 * `blockparty/icon` / `beapi/icon-block` for older installs. Example —
	 * allow only the native icon block:
	 *
	 *     add_filter(
	 *         'blockparty_accordion_allowed_icon_blocks',
	 *         static function (): array {
	 *             return [ 'core/icon' ];
	 *         }
	 *     );
	 *
	 * The first registered block in the list is used as the InnerBlocks
	 * template when enabling an icon on a summary.
	 *
	 * @param string[] $blocks Allowed block names.
	 */
	$blocks = apply_filters(
		'blockparty_accordion_allowed_icon_blocks',
		BLOCKPARTY_ACCORDION_DEFAULT_ICON_BLOCKS
	);

	if ( ! is_array( $blocks ) ) {
		return BLOCKPARTY_ACCORDION_DEFAULT_ICON_BLOCKS;
	}

	$sanitized = [];
	foreach ( $blocks as $block ) {
		if ( ! is_string( $block ) ) {
			continue;
		}

		$block = strtolower( trim( $block ) );
		if ( ! preg_match( '/^[a-z0-9-]+\/[a-z0-9-]+$/', $block ) ) {
			continue;
		}

		$sanitized[] = $block;
	}

	$sanitized = array_values( array_unique( $sanitized ) );

	return [] === $sanitized ? BLOCKPARTY_ACCORDION_DEFAULT_ICON_BLOCKS : $sanitized;
}

/**
 * Passes editor settings (allowed icon blocks) to the summary script.
 */
function enqueue_editor_settings(): void {
	$handle = generate_block_asset_handle( 'blockparty/accordion-summary', 'editorScript' );

	if ( ! wp_script_is( $handle, 'registered' ) ) {
		return;
	}

	$settings = [
		'allowedIconBlocks' => get_allowed_icon_blocks(),
	];

	wp_add_inline_script(
		$handle,
		'window.blockpartyAccordionSettings = ' . wp_json_encode( $settings ) . ';',
		'before'
	);
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

/**
 * Set first accordion trigger to aria-expanded="true" when block has firstItemOpenByDefault.
 *
 * Done server-side for LCP: the BeAPI a11y JS library would set it on load, but that would cause a visible
 * layout shift (first panel hidden then shown). Outputting the correct state in HTML
 * avoids that shift. The summary block cannot know it is the first item, so it always
 * outputs aria-expanded="false"; this filter corrects the first trigger only.
 *
 * @param string $block_content The block content.
 * @param array  $block        The full block, including blockName and attrs.
 * @return string Filtered block content.
 */
function render_accordion_first_item_expanded( $block_content, $block ) {
	if ( ( $block['blockName'] ?? '' ) !== 'blockparty/accordion' ) {
		return $block_content;
	}
	$first_open = $block['attrs']['firstItemOpenByDefault'] ?? false;
	if ( ! $first_open ) {
		return $block_content;
	}
	// Replace only the first occurrence (first trigger) so the first item is expanded.
	$block_content = preg_replace(
		'/aria-expanded="false"/',
		'aria-expanded="true"',
		$block_content,
		1
	);
	return $block_content;
}

add_action( 'init', __NAMESPACE__ . '\\init' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_editor_settings' );
add_filter( 'wp_kses_allowed_html', __NAMESPACE__ . '\\allow_aria_attributes', 10, 2 );
add_filter( 'render_block', __NAMESPACE__ . '\\render_accordion_first_item_expanded', 10, 2 );
