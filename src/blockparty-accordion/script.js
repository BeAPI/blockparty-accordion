import { Accordion } from '@beapi/be-a11y';

// eslint-disable-next-line no-undef
const accordionConfig = beapiAccordionBlock.accordionConfig;

// Initialize beapi-accordion
window.addEventListener('load', function () {
	Accordion.init('.wp-block-blockparty-accordion', accordionConfig);
});
