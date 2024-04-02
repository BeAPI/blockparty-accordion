import { Accordion } from '@beapi/be-a11y';

// Initialize beapi-accordion
window.addEventListener('load', function () {
	Accordion.init('.wp-block-blockparty-accordion', {
		panelSelector: '.wp-block-blockparty-accordion-panel',
		allowMultiple: true,
		hasAnimation: true,
		forceExpand: false,
		prefixId: 'block-accordion',
		triggerSelector: '.wp-block-blockparty-accordion-trigger',
	});
});
