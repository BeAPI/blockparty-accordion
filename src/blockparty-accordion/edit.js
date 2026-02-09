import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

const BLOCKS_CHILD = 'blockparty/accordion-item';
const ALLOWED_BLOCKS = [BLOCKS_CHILD];

export default function Edit({ attributes, setAttributes }) {
	const { firstItemOpenByDefault } = attributes;
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: [[BLOCKS_CHILD], [BLOCKS_CHILD], [BLOCKS_CHILD]],
	});
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Accordion options', 'blockparty-accordion')}
				>
					<ToggleControl
						label={__(
							'Open first item by default',
							'blockparty-accordion'
						)}
						checked={firstItemOpenByDefault}
						onChange={(value) =>
							setAttributes({ firstItemOpenByDefault: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}
