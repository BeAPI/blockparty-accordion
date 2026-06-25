import { Accordion } from '@beapi/be-a11y';

// eslint-disable-next-line no-undef
const accordionConfig = beapiAccordionBlock.accordionConfig;

// Initialize beapi-accordion (closedDefault from block option firstItemOpenByDefault)
window.addEventListener('load', function () {
	const selector = '.wp-block-blockparty-accordion';
	const elements = document.querySelectorAll(selector);
	elements.forEach((el) => {
		const config = { ...accordionConfig };
		if (el.dataset.firstItemOpenByDefault === 'true') {
			config.closedDefault = false;
		}
		if (el.dataset.allowMultiple !== undefined) {
			config.allowMultiple = el.dataset.allowMultiple === 'true';
		}
		Accordion.init(el, config);
	});
});
