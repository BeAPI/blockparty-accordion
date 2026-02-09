import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { firstItemOpenByDefault } = attributes;
	const blockProps = useBlockProps.save({
		'data-first-item-open-by-default': firstItemOpenByDefault
			? 'true'
			: undefined,
	});
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);
	return <div {...innerBlocksProps} />;
}
