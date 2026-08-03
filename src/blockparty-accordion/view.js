import { Accordion } from '@beapi/be-a11y';

// eslint-disable-next-line no-undef
const accordionConfig = beapiAccordionBlock.accordionConfig;

/**
 * Initialize beapi-accordion instances.
 * closedDefault comes from block option firstItemOpenByDefault.
 */
const initAccordions = () => {
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
};

// Deferred scripts run after HTML is parsed: init immediately, or wait for DOMContentLoaded.
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initAccordions);
} else {
	initAccordions();
}
