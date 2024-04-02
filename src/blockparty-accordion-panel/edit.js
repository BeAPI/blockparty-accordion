import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { select } from '@wordpress/data';

export default function Edit() {
	let allowedBlocks = [];
	const hasSupport = select('core/blocks').hasBlockSupport(
		'blockparty/acordion',
		'acordionPanelBlocks'
	);
	if (hasSupport) {
		allowedBlocks = select('core/blocks').getBlockSupport(
			'blockparty/acordion',
			'acordionPanelBlocks'
		);
	} else {
		allowedBlocks = select('core/blocks')
			.getBlockTypes()
			.map((block) => {
				return block.name;
			})
			.filter((blockName) => {
				return (
					blockName !== 'blockparty/accordion' &&
					blockName !== 'blockparty/accordion-item' &&
					blockName !== 'blockparty/accordion-summary' &&
					blockName !== 'blockparty/accordion-panel'
				);
			});
	}

	return (
		<div {...useBlockProps()}>
			<div className="wp-block-blockparty-accordion-panel__inner">
				<InnerBlocks
					allowedBlocks={allowedBlocks}
					templateLock={false}
					template={[['core/paragraph']]}
				/>
			</div>
		</div>
	);
}
