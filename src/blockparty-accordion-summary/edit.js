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

export default function Edit({ attributes, setAttributes, context = {} }) {
	const DEFAULT_TABS_ICON_BLOCK = ['beapi/icon-block', 'blockparty/icon'];
	let allowedAccordionIconBlock = DEFAULT_TABS_ICON_BLOCK;
	const hasSupport = select('core/blocks').hasBlockSupport(
		'blockparty/accordion',
		'AccordionIconBlock'
	);
	if (hasSupport) {
		const supportBlocks = select('core/blocks').getBlockSupport(
			'blockparty/accordion',
			'AccordionIconBlock'
		);
		if (
			!Array.isArray(supportBlocks) ||
			typeof supportBlocks[0] === 'undefined'
		) {
			allowedAccordionIconBlock = [];
		} else {
			allowedAccordionIconBlock = [
				...new Set([...supportBlocks, ...DEFAULT_TABS_ICON_BLOCK]),
			];
		}
	}
	// Ne garder que les blocs réellement enregistrés (actifs).
	const registeredIconBlocks = allowedAccordionIconBlock.filter(
		(blockName) => typeof getBlockType(blockName) !== 'undefined'
	);
	const hasIconBlock = registeredIconBlocks.length > 0;
	const templateIconBlock = registeredIconBlocks[0];
	const { hasIcon, label, headingLevel: savedHeadingLevel } = attributes;
	const headingLevel =
		context['blockparty/headingLevel'] ?? savedHeadingLevel ?? 3;
	const HeadingTag = `h${headingLevel}`;

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
			<HeadingTag {...useBlockProps()}>
				{hasIcon && hasIconBlock && (
					<InnerBlocks
						allowedBlocks={registeredIconBlocks}
						__experimentalDirectInsert={false}
						templateLock={false}
						template={[
							[templateIconBlock, { width: 24, maxIcons: 1 }],
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
			</HeadingTag>
		</>
	);
}
