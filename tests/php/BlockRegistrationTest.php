<?php
/**
 * Tests for block registration and plugin bootstrap.
 *
 * @package Blockparty\Accordion
 */

namespace Blockparty\Accordion\Tests;

use WP_UnitTestCase;

/**
 * @covers ::Blockparty\Accordion\init
 */
class BlockRegistrationTest extends WP_UnitTestCase {

	/**
	 * @return void
	 */
	public function test_plugin_constants_are_defined(): void {
		$this->assertTrue( defined( 'BLOCKPARTY_ACCORDION_VERSION' ) );
		$this->assertTrue( defined( 'BLOCKPARTY_ACCORDION_DIR' ) );
		$this->assertTrue( defined( 'BLOCKPARTY_ACCORDION_URL' ) );
		$this->assertTrue( defined( 'BLOCKPARTY_ACCORDION_PLUGIN_DIRNAME' ) );
		$this->assertNotEmpty( BLOCKPARTY_ACCORDION_VERSION );
	}

	/**
	 * @return void
	 */
	public function test_all_accordion_blocks_are_registered(): void {
		$expected = [
			'blockparty/accordion',
			'blockparty/accordion-item',
			'blockparty/accordion-summary',
			'blockparty/accordion-panel',
		];

		foreach ( $expected as $block_name ) {
			$this->assertTrue(
				\WP_Block_Type_Registry::get_instance()->is_registered( $block_name ),
				sprintf( 'Expected block "%s" to be registered.', $block_name )
			);
		}
	}

	/**
	 * @return void
	 */
	public function test_parent_accordion_block_exposes_view_script(): void {
		$block = \WP_Block_Type_Registry::get_instance()->get_registered( 'blockparty/accordion' );

		$this->assertNotNull( $block );
		$this->assertNotEmpty( $block->view_script_handles );
	}

	/**
	 * @return void
	 */
	public function test_init_callback_is_registered_on_init(): void {
		$this->assertNotFalse(
			has_action( 'init', 'Blockparty\\Accordion\\init' )
		);
	}

	/**
	 * @return void
	 */
	public function test_blockparty_accordion_init_action_ran_during_bootstrap(): void {
		$this->assertGreaterThan( 0, did_action( 'blockparty_accordion_init' ) );
	}

	/**
	 * @return void
	 */
	public function test_react_jsx_runtime_script_is_registered(): void {
		$this->assertTrue(
			wp_script_is( 'react-jsx-runtime', 'registered' ),
			'Expected react-jsx-runtime to be registered (core or plugin polyfill).'
		);
	}

	/**
	 * Editor scripts depend on the `react-jsx-runtime` handle; it must be emitted by webpack.
	 *
	 * @return void
	 */
	public function test_react_jsx_runtime_polyfill_asset_is_built(): void {
		$asset = BLOCKPARTY_ACCORDION_DIR . 'build/react-jsx-runtime.js';

		$this->assertFileIsReadable(
			$asset,
			'Run `npm run build` so webpack emits build/react-jsx-runtime.js (see webpack.config.js).'
		);
	}

	/**
	 * @return void
	 */
	public function test_react_jsx_runtime_polyfill_registers_plugin_script(): void {
		$asset = BLOCKPARTY_ACCORDION_DIR . 'build/react-jsx-runtime.js';
		if ( ! is_readable( $asset ) ) {
			$this->markTestSkipped( 'Built polyfill asset missing; run npm run build.' );
		}

		global $wp_scripts;

		unset( $wp_scripts->registered['react-jsx-runtime'] );

		\Blockparty\Accordion\register_react_jsx_runtime( $wp_scripts );

		$this->assertTrue( wp_script_is( 'react-jsx-runtime', 'registered' ) );
		$this->assertStringContainsString(
			'build/react-jsx-runtime.js',
			$wp_scripts->registered['react-jsx-runtime']->src
		);
	}
}
