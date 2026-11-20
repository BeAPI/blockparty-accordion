/**
 * @jest-environment jsdom
 */

/**
 * Internal dependencies
 */
import { getAccordionConfig } from '../../src/blockparty-accordion/getAccordionConfig';

const QUERY = '(prefers-reduced-motion: reduce)';

describe( 'getAccordionConfig', () => {
	const originalMatchMedia = window.matchMedia;

	afterEach( () => {
		if ( originalMatchMedia === undefined ) {
			delete window.matchMedia;
		} else {
			window.matchMedia = originalMatchMedia;
		}
	} );

	it( 'disables the animation when reduced motion is requested', () => {
		window.matchMedia = jest.fn().mockReturnValue( { matches: true } );

		const result = getAccordionConfig( {
			hasAnimation: true,
			closedDefault: true,
		} );

		expect( window.matchMedia ).toHaveBeenCalledWith( QUERY );
		expect( result ).toEqual( {
			hasAnimation: false,
			closedDefault: true,
		} );
	} );

	it( 'keeps the animation when reduced motion is not requested', () => {
		window.matchMedia = jest.fn().mockReturnValue( { matches: false } );

		expect( getAccordionConfig( { hasAnimation: true } ) ).toEqual( {
			hasAnimation: true,
		} );
	} );

	it( 'falls back to the config when matchMedia is missing', () => {
		delete window.matchMedia;

		expect( () =>
			getAccordionConfig( { hasAnimation: true } )
		).not.toThrow();
		expect( getAccordionConfig( { hasAnimation: true } ) ).toEqual( {
			hasAnimation: true,
		} );
	} );

	it( 'falls back to the config when there is no window', () => {
		expect( getAccordionConfig( { hasAnimation: true }, null ) ).toEqual( {
			hasAnimation: true,
		} );
	} );

	it( 'keeps hasAnimation false when already false', () => {
		window.matchMedia = jest.fn().mockReturnValue( { matches: false } );
		expect( getAccordionConfig( { hasAnimation: false } ) ).toEqual( {
			hasAnimation: false,
		} );

		window.matchMedia = jest.fn().mockReturnValue( { matches: true } );
		expect( getAccordionConfig( { hasAnimation: false } ) ).toEqual( {
			hasAnimation: false,
		} );
	} );

	it( 'does not mutate the input and tolerates a missing config', () => {
		window.matchMedia = jest.fn().mockReturnValue( { matches: true } );
		const input = { hasAnimation: true };

		const result = getAccordionConfig( input );

		expect( input ).toEqual( { hasAnimation: true } );
		expect( result ).not.toBe( input );
		expect( getAccordionConfig( null ) ).toEqual( { hasAnimation: false } );
	} );
} );
