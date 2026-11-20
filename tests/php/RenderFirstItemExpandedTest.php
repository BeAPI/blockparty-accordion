<?php
/**
 * Tests for first-item-expanded server render filter.
 *
 * @package Blockparty\Accordion
 */

namespace Blockparty\Accordion\Tests;

use WP_UnitTestCase;
use function Blockparty\Accordion\render_accordion_first_item_expanded;

/**
 * @covers ::Blockparty\Accordion\render_accordion_first_item_expanded
 */
class RenderFirstItemExpandedTest extends WP_UnitTestCase {

	/**
	 * @return void
	 */
	public function test_leaves_content_unchanged_for_other_blocks(): void {
		$content = '<button aria-expanded="false">Item</button>';
		$block   = [
			'blockName' => 'core/paragraph',
			'attrs'     => [ 'firstItemOpenByDefault' => true ],
		];

		$this->assertSame(
			$content,
			render_accordion_first_item_expanded( $content, $block )
		);
	}

	/**
	 * @return void
	 */
	public function test_leaves_content_unchanged_when_option_disabled(): void {
		$content = '<button aria-expanded="false">First</button><button aria-expanded="false">Second</button>';
		$block   = [
			'blockName' => 'blockparty/accordion',
			'attrs'     => [ 'firstItemOpenByDefault' => false ],
		];

		$this->assertSame(
			$content,
			render_accordion_first_item_expanded( $content, $block )
		);
	}

	/**
	 * @return void
	 */
	public function test_expands_only_the_first_trigger_when_option_enabled(): void {
		$content = '<button aria-expanded="false">First</button><button aria-expanded="false">Second</button>';
		$block   = [
			'blockName' => 'blockparty/accordion',
			'attrs'     => [ 'firstItemOpenByDefault' => true ],
		];

		$result = render_accordion_first_item_expanded( $content, $block );

		$this->assertSame(
			'<button aria-expanded="true">First</button><button aria-expanded="false">Second</button>',
			$result
		);
	}

	/**
	 * @return void
	 */
	public function test_returns_content_unchanged_when_no_trigger_present(): void {
		$block = [
			'blockName' => 'blockparty/accordion',
			'attrs'     => [ 'firstItemOpenByDefault' => true ],
		];

		$without_button = '<div><p>No trigger here</p></div>';
		$this->assertSame(
			$without_button,
			render_accordion_first_item_expanded( $without_button, $block )
		);

		$without_attribute = '<div><button type="button">Item</button></div>';
		$this->assertSame(
			$without_attribute,
			render_accordion_first_item_expanded( $without_attribute, $block )
		);
	}

	/**
	 * @return void
	 */
	public function test_does_not_modify_aria_expanded_text_before_first_trigger(): void {
		$content = '<p>Use aria-expanded="false" on triggers.</p><button aria-expanded="false">First</button><button aria-expanded="false">Second</button>';
		$block   = [
			'blockName' => 'blockparty/accordion',
			'attrs'     => [ 'firstItemOpenByDefault' => true ],
		];

		$result = render_accordion_first_item_expanded( $content, $block );

		$this->assertSame(
			'<p>Use aria-expanded="false" on triggers.</p><button aria-expanded="true">First</button><button aria-expanded="false">Second</button>',
			$result
		);
	}
}
