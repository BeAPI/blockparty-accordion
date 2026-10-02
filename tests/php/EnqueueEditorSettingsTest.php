<?php
/**
 * Tests for editor settings passed to the summary script.
 *
 * @package Blockparty\Accordion
 */

namespace Blockparty\Accordion\Tests;

use WP_UnitTestCase;
use function Blockparty\Accordion\enqueue_editor_settings;

/**
 * @covers ::Blockparty\Accordion\enqueue_editor_settings
 */
class EnqueueEditorSettingsTest extends WP_UnitTestCase {

	/**
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited -- Reset script registry between tests.
		wp_scripts()->registered = [];
		wp_scripts()->queue      = [];
		wp_scripts()->done       = [];
		// phpcs:enable WordPress.WP.GlobalVariablesOverride.Prohibited
	}

	/**
	 * @return void
	 */
	public function test_adds_inline_settings_when_summary_script_is_registered(): void {
		$handle = generate_block_asset_handle( 'blockparty/accordion-summary', 'editorScript' );

		wp_register_script( $handle, false, [], '1.0.0', true );

		enqueue_editor_settings();

		$after  = wp_scripts()->get_data( $handle, 'after' );
		$before = wp_scripts()->get_data( $handle, 'before' );
		$data   = is_array( $before ) ? implode( "\n", $before ) : (string) $before;

		if ( '' === $data && is_array( $after ) ) {
			$data = implode( "\n", $after );
		}

		$this->assertStringContainsString( 'window.blockpartyAccordionSettings', $data );
		$this->assertStringContainsString( 'allowedIconBlocks', $data );
		$this->assertMatchesRegularExpression( '/core\\\\?\/icon/', $data );
	}

	/**
	 * @return void
	 */
	public function test_is_noop_when_summary_script_is_not_registered(): void {
		enqueue_editor_settings();

		$handle = generate_block_asset_handle( 'blockparty/accordion-summary', 'editorScript' );
		$before = wp_scripts()->get_data( $handle, 'before' );

		$this->assertFalse( $before );
	}
}
