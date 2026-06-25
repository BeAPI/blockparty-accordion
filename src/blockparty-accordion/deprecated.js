import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

function saveWithExplicitAllowMultiple({ attributes }) {
	const { firstItemOpenByDefault, allowMultiple } = attributes;
	const blockProps = useBlockProps.save({
		'data-first-item-open-by-default': firstItemOpenByDefault
			? 'true'
			: undefined,
		'data-allow-multiple': allowMultiple ? 'true' : 'false',
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
		save: saveWithExplicitAllowMultiple,
		migrate: migrateAccordionAttributes,
	},
];
