import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		role: `region`,
	});
	const innerBlocksProps = useInnerBlocksProps.save({
		className: `wp-block-blockparty-accordion-panel__inner`,
	});
	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
}
