import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { hasIcon, label } = attributes;

	return (
		<h3 {...useBlockProps.save()}>
			<button
				aria-expanded="false"
				className="wp-block-blockparty-accordion-trigger"
			>
				{hasIcon && <InnerBlocks.Content />}
				<RichText.Content
					tagName="span"
					className={'wp-block-blockparty-accordion-title'}
					value={label}
				/>
			</button>
		</h3>
	);
}
