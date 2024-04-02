import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import './editor.scss';

const BLOCKS_CHILD = 'blockparty/accordion-item';
const ALLOWED_BLOCKS = [BLOCKS_CHILD];

export default function Edit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: [[BLOCKS_CHILD], [BLOCKS_CHILD], [BLOCKS_CHILD]],
	});
	return <div {...innerBlocksProps} />;
}
