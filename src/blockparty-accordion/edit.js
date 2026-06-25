import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	useBlockEditContext,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	PanelBody,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis -- ToggleGroupControl is not yet a stable export in @wordpress/components 27.
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import {
	headingLevel2,
	headingLevel3,
	headingLevel4,
	headingLevel5,
	headingLevel6,
} from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import './editor.scss';

const BLOCKS_CHILD = 'blockparty/accordion-item';
const ALLOWED_BLOCKS = [BLOCKS_CHILD];
const SUMMARY_BLOCK = 'blockparty/accordion-summary';

const HEADING_LEVELS = [2, 3, 4, 5, 6];

const HEADING_LEVEL_ICONS = {
	2: headingLevel2,
	3: headingLevel3,
	4: headingLevel4,
	5: headingLevel5,
	6: headingLevel6,
};

function collectSummaryBlocks(blocks) {
	return blocks.flatMap((block) => {
		const summaries = block.name === SUMMARY_BLOCK ? [block] : [];
		return summaries.concat(collectSummaryBlocks(block.innerBlocks || []));
	});
}

function useSyncSummaryHeadingLevels(headingLevel) {
	const { clientId } = useBlockEditContext();
	const { updateBlockAttributes } = useDispatch(blockEditorStore);
	const summaryBlocks = useSelect(
		(select) => {
			const { getBlocksByClientId } = select(blockEditorStore);
			const [accordionBlock] = getBlocksByClientId(clientId);

			return collectSummaryBlocks(accordionBlock?.innerBlocks || []);
		},
		[clientId]
	);

	useEffect(() => {
		summaryBlocks.forEach((block) => {
			if (block.attributes.headingLevel !== headingLevel) {
				updateBlockAttributes(block.clientId, { headingLevel });
			}
		});
	}, [headingLevel, summaryBlocks, updateBlockAttributes]);
}

export default function Edit({ attributes, setAttributes }) {
	const { firstItemOpenByDefault, headingLevel } = attributes;
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: [[BLOCKS_CHILD], [BLOCKS_CHILD], [BLOCKS_CHILD]],
	});

	useSyncSummaryHeadingLevels(headingLevel);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'blockparty-accordion')}>
					<ToggleControl
						label={__(
							'Open first item by default',
							'blockparty-accordion'
						)}
						help={__(
							'The first item will be opened by default when the page loads if this option is enabled.',
							'blockparty-accordion'
						)}
						checked={firstItemOpenByDefault}
						onChange={(value) =>
							setAttributes({ firstItemOpenByDefault: value })
						}
					/>
					<ToggleGroupControl
						label={__(
							'Summary heading level',
							'blockparty-accordion'
						)}
						help={__(
							'Define the heading level for each accordion summary.',
							'blockparty-accordion'
						)}
						value={headingLevel}
						isBlock
						__next40pxDefaultSize
						onChange={(value) =>
							setAttributes({ headingLevel: Number(value) })
						}
					>
						{HEADING_LEVELS.map((level) => (
							<ToggleGroupControlOptionIcon
								key={level}
								value={level}
								icon={HEADING_LEVEL_ICONS[level]}
								label={sprintf(
									/* translators: %d: heading level number (2–6). */
									__(
										'Heading level %d',
										'blockparty-accordion'
									),
									level
								)}
							/>
						))}
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}
