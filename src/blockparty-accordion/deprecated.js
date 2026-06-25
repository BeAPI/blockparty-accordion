import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

// Matches markup saved before allowMultiple was always serialized on the wrapper.
function saveWithImplicitAllowMultiple({ attributes }) {
	const { firstItemOpenByDefault, allowMultiple } = attributes;
	const blockProps = useBlockProps.save({
		'data-first-item-open-by-default': firstItemOpenByDefault
			? 'true'
			: undefined,
		'data-allow-multiple': allowMultiple ? undefined : 'false',
	});
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return <div {...innerBlocksProps} />;
}

const migrateAccordionAttributes = (attributes) => ({
	firstItemOpenByDefault: attributes.firstItemOpenByDefault ?? false,
	headingLevel: attributes.headingLevel ?? 3,
	allowMultiple: attributes.allowMultiple ?? true,
});

export default [
	{
		attributes: {
			firstItemOpenByDefault: {
				type: 'boolean',
				default: false,
			},
			headingLevel: {
				type: 'number',
				default: 3,
			},
			allowMultiple: {
				type: 'boolean',
				default: true,
			},
		},
		save: saveWithImplicitAllowMultiple,
		migrate: migrateAccordionAttributes,
	},
];
