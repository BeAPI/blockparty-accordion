<?php
/**
 * Tests for the react-jsx-runtime compatibility shim.
 *
 * @package blockparty-accordion
 */

namespace Blockparty\Accordion\Tests;

use WP_UnitTestCase;
use function Blockparty\Accordion\register_react_jsx_runtime_compat;

/**
 * @covers ::Blockparty\Accordion\register_react_jsx_runtime_compat
 */
class RegisterReactJsxRuntimeTest extends WP_UnitTestCase {

	public function test_registers_compat_script_when_handle_is_missing(): void {
		wp_deregister_script( 'react-jsx-runtime' );

		register_react_jsx_runtime_compat();

		$this->assertTrue( wp_script_is( 'react-jsx-runtime', 'registered' ) );

		$script = wp_scripts()->registered['react-jsx-runtime'] ?? null;

		$this->assertNotNull( $script );
		$this->assertContains( 'wp-element', $script->deps );
		$this->assertStringContainsString(
			'assets/compat/react-jsx-runtime.js',
			$script->src
		);
	}

	public function test_does_not_override_core_script(): void {
		wp_deregister_script( 'react-jsx-runtime' );

		wp_register_script(
			'react-jsx-runtime',
			'https://example.com/core-react-jsx-runtime.js',
			[],
			'1.0.0',
			true
		);

		register_react_jsx_runtime_compat();

		$script = wp_scripts()->registered['react-jsx-runtime'] ?? null;

		$this->assertNotNull( $script );
		$this->assertSame(
			'https://example.com/core-react-jsx-runtime.js',
			$script->src
		);
	}
}
