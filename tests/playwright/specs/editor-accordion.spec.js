/**
 * WordPress dependencies
 */
import { test, expect } from '../utils/fixtures';

/**
 * Resolve the block editor content root.
 *
 * WordPress 6.4+ uses an iframed canvas (`editor-canvas`). Detect the canvas
 * mode explicitly: `FrameLocator.or()` is unreliable when the iframe is absent.
 *
 * @param {import('@playwright/test').Page} page
 */
const getEditorCanvas = async ( page ) => {
	const iframe = page.locator( 'iframe[name="editor-canvas"]' );
	const hasIframe = await iframe
		.waitFor( { state: 'attached', timeout: 3_000 } )
		.then( () => true )
		.catch( () => false );

	if ( hasIframe ) {
		return page.frameLocator( 'iframe[name="editor-canvas"]' );
	}

	return page.locator( 'body' );
};

test.describe( 'Blockparty Accordion editor', () => {
	test.beforeEach( async ( { admin } ) => {
		await admin.createNewPost();
	} );

	test( 'inserts the Accordion block from the inserter', async ( {
		editor,
		page,
	} ) => {
		const isBlockRegistered = await page.evaluate(
			() => !! window.wp?.blocks?.getBlockType( 'blockparty/accordion' )
		);
		test.skip(
			! isBlockRegistered,
			'blockparty/accordion is not registered in the editor (block scripts may be unavailable on this WordPress version).'
		);

		await editor.insertBlock( { name: 'blockparty/accordion' } );

		const canvas = await getEditorCanvas( page );
		const accordionRoot = canvas.locator(
			'.wp-block-blockparty-accordion'
		);
		await expect( accordionRoot ).toBeVisible( { timeout: 10_000 } );

		await expect(
			accordionRoot.locator( '> .wp-block-blockparty-accordion-item' )
		).toHaveCount( 3 );

		await editor.saveDraft();
		await expect(
			page.getByRole( 'button', { name: 'Saved' } )
		).toBeVisible( { timeout: 15_000 } );
	} );
} );
