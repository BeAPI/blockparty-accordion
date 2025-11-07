import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { shapes } from '@beapi/icons';

export default function Edit({ attributes, setAttributes }) {
	const DEFAULT_TABS_ICON_BLOCK = ['beapi/icon-block'];
	let allowedAccordionIconBlock = DEFAULT_TABS_ICON_BLOCK;
	let acordionIconBlock = allowedAccordionIconBlock[0];
	const hasSupport = select('core/blocks').hasBlockSupport(
		'blockparty/accordion',
		'AccordionIconBlock'
	);
	if (hasSupport) {
		allowedAccordionIconBlock = select('core/blocks').getBlockSupport(
			'blockparty/accordion',
			'AccordionIconBlock'
		);
		if (
			!Array.isArray(allowedAccordionIconBlock) ||
			typeof allowedAccordionIconBlock[0] === 'undefined'
		) {
			acordionIconBlock = false;
			allowedAccordionIconBlock = [];
		} else {
			acordionIconBlock = allowedAccordionIconBlock[0];
		}
	}
	const hasIconBlock =
		typeof getBlockType(acordionIconBlock) !== 'undefined' &&
		acordionIconBlock;
	const { hasIcon, label } = attributes;

	return (
		<>
			<BlockControls key="toolbar">
				<ToolbarGroup>
					<ToolbarButton
						icon={shapes}
						label={__('Icon', 'blockparty-accordion')}
						className={hasIcon ? 'is-pressed' : ''}
						isDisabled={!hasIconBlock}
						onClick={() => {
							setAttributes({ hasIcon: !hasIcon });
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<h3 {...useBlockProps()}>
				{hasIcon && hasIconBlock && (
					<InnerBlocks
						allowedBlocks={allowedAccordionIconBlock}
						__experimentalDirectInsert={false}
						templateLock={false}
						template={[
							[acordionIconBlock, { width: 24, maxIcons: 1 }],
						]}
						templateInsertUpdatesSelection={false}
						directInsert={false}
						renderAppender={false}
					/>
				)}
				<RichText
					tagName="span"
					className="wp-block-blockparty-accordion-trigger"
					allowedFormats={['core/image', 'core/italic', 'core/bold']}
					value={label}
					placeholder={__('Summary…', 'blockparty-accordion')}
					onChange={(content) => {
						setAttributes({ label: content });
					}}
				/>
			</h3>
		</>
	);
}
