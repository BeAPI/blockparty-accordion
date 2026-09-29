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
}
