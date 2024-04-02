import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
export default function Edit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalDirectInsert: false,
		templateLock: 'all',
		template: [
			['blockparty/accordion-summary'],
			['blockparty/accordion-panel'],
		],
	});
	return (
		<div {...useBlockProps()}>
			<div {...innerBlocksProps} />
		</div>
	);
}
