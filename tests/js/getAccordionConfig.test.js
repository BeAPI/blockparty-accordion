/**
 * @jest-environment jsdom
 */

/**
 * Internal dependencies
 */
import { getAccordionConfig } from '../../src/blockparty-accordion/getAccordionConfig';

const originalMatchMedia = window.matchMedia;

const mockMatchMedia = ( matches ) => {
	window.matchMedia = jest.fn( ( query ) => ( {
		matches: query === '(prefers-reduced-motion: reduce)' && matches,
		media: query,
	} ) );
};

describe( 'getAccordionConfig', () => {
	afterEach( () => {
		window.matchMedia = originalMatchMedia;
	} );

	it( 'disables the animation when reduced motion is requested', () => {
		mockMatchMedia( true );

		expect(
			getAccordionConfig( { hasAnimation: true, closedDefault: true } )
		).toEqual( { hasAnimation: false, closedDefault: true } );
		expect( window.matchMedia ).toHaveBeenCalledWith(
			'(prefers-reduced-motion: reduce)'
		);
	} );

	it( 'keeps the configuration unchanged when reduced motion is not requested', () => {
		mockMatchMedia( false );

		expect(
			getAccordionConfig( { hasAnimation: true, closedDefault: true } )
		).toEqual( { hasAnimation: true, closedDefault: true } );
	} );

	it( 'keeps the configuration unchanged when matchMedia is unavailable', () => {
		delete window.matchMedia;

		expect( getAccordionConfig( { hasAnimation: true } ) ).toEqual( {
			hasAnimation: true,
		} );
	} );

	it( 'keeps hasAnimation disabled when the PHP filter already set it to false', () => {
		mockMatchMedia( false );
		expect( getAccordionConfig( { hasAnimation: false } ) ).toEqual( {
			hasAnimation: false,
		} );

		mockMatchMedia( true );
		expect( getAccordionConfig( { hasAnimation: false } ) ).toEqual( {
			hasAnimation: false,
		} );
	} );

	it( 'does not mutate the base configuration', () => {
		mockMatchMedia( true );
		const baseConfig = { hasAnimation: true };

		getAccordionConfig( baseConfig );

		expect( baseConfig ).toEqual( { hasAnimation: true } );
	} );
} );
