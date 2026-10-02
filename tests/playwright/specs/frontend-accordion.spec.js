/**
 * WordPress dependencies
 */
import { test, expect } from '../utils/fixtures';

const ACCORDION_MARKUP = `<!-- wp:blockparty/accordion -->
<div class="wp-block-blockparty-accordion" data-allow-multiple="true"><!-- wp:blockparty/accordion-item -->
<div class="wp-block-blockparty-accordion-item"><!-- wp:blockparty/accordion-summary {"label":"First item"} -->
<h3 class="wp-block-blockparty-accordion-summary"><button type="button" aria-expanded="false" class="wp-block-blockparty-accordion-trigger"><span class="wp-block-blockparty-accordion-title">First item</span></button></h3>
<!-- /wp:blockparty/accordion-summary -->

<!-- wp:blockparty/accordion-panel -->
<div role="region" class="wp-block-blockparty-accordion-panel"><div class="wp-block-blockparty-accordion-panel__inner"><!-- wp:paragraph -->
<p>First panel content</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:blockparty/accordion-panel --></div>
<!-- /wp:blockparty/accordion-item -->

<!-- wp:blockparty/accordion-item -->
<div class="wp-block-blockparty-accordion-item"><!-- wp:blockparty/accordion-summary {"label":"Second item"} -->
<h3 class="wp-block-blockparty-accordion-summary"><button type="button" aria-expanded="false" class="wp-block-blockparty-accordion-trigger"><span class="wp-block-blockparty-accordion-title">Second item</span></button></h3>
<!-- /wp:blockparty/accordion-summary -->

<!-- wp:blockparty/accordion-panel -->
<div role="region" class="wp-block-blockparty-accordion-panel"><div class="wp-block-blockparty-accordion-panel__inner"><!-- wp:paragraph -->
<p>Second panel content</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:blockparty/accordion-panel --></div>
<!-- /wp:blockparty/accordion-item --></div>
<!-- /wp:blockparty/accordion -->`;

test.describe( 'Blockparty Accordion frontend', () => {
	let post;

	test.beforeEach( async ( { requestUtils } ) => {
		post = await requestUtils.createPost( {
			title: 'Blockparty Accordion E2E',
			content: ACCORDION_MARKUP,
			status: 'publish',
		} );
	} );

	test.afterEach( async ( { requestUtils } ) => {
		if ( post?.id ) {
			await requestUtils.rest( {
				method: 'DELETE',
				path: `/wp/v2/posts/${ post.id }`,
				params: { force: true },
			} );
		}
	} );

	test( 'expands and collapses panels via trigger clicks', async ( {
		page,
	} ) => {
		await page.goto( post.link );

		const accordionRoot = page.locator( '.wp-block-blockparty-accordion' );
		await expect( accordionRoot ).toBeVisible();

		const triggers = page.locator(
			'.wp-block-blockparty-accordion-trigger'
		);
		await expect( triggers ).toHaveCount( 2 );

		await expect( page.getByText( 'First panel content' ) ).toBeHidden();
		await expect( page.getByText( 'Second panel content' ) ).toBeHidden();

		await triggers.nth( 0 ).click();
		await expect( triggers.nth( 0 ) ).toHaveAttribute(
			'aria-expanded',
			'true'
		);
		await expect( page.getByText( 'First panel content' ) ).toBeVisible();

		await triggers.nth( 1 ).click();
		await expect( triggers.nth( 1 ) ).toHaveAttribute(
			'aria-expanded',
			'true'
		);
		await expect( page.getByText( 'Second panel content' ) ).toBeVisible();
		await expect( page.getByText( 'First panel content' ) ).toBeVisible();
	} );
} );
