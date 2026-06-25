import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
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
