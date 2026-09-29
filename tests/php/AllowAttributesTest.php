<?php
/**
 * Tests for KSES allowlist required by saved accordion markup.
 *
 * @package Blockparty\Accordion
 */

namespace Blockparty\Accordion\Tests;

use WP_UnitTestCase;
use function Blockparty\Accordion\allow_aria_attributes;

/**
 * @covers ::Blockparty\Accordion\allow_aria_attributes
 */
class AllowAttributesTest extends WP_UnitTestCase {

	/**
	 * @return void
	 */
	public function test_allows_aria_expanded_on_button_in_post_context(): void {
		$tags = [
			'button' => [],
		];

		$result = allow_aria_attributes( $tags, 'post' );

		$this->assertTrue( $result['button']['aria-expanded'] );
	}

	/**
	 * @return void
	 */
	public function test_does_not_modify_non_post_context(): void {
		$tags = [
			'button' => [],
		];

		$result = allow_aria_attributes( $tags, 'strip' );

		$this->assertSame( $tags, $result );
	}

	/**
	 * @return void
	 */
	public function test_kses_preserves_aria_expanded_on_trigger(): void {
		$html = '<button type="button" class="wp-block-blockparty-accordion-trigger" aria-expanded="false">Summary</button>';

		$filtered = wp_kses_post( $html );

		$this->assertStringContainsString( 'aria-expanded="false"', $filtered );
	}
}
