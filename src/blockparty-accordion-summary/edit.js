import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { select } from '@wordpress/data';
import { shapes } from '@beapi/icons';
import {
	getIconTemplateAttributes,
	getRegisteredIconBlocks,
} from './getAllowedIconBlocks';

function getAdditionalIconBlocksFromSupport() {
	const hasSupport = select( 'core/blocks' ).hasBlockSupport(
		'blockparty/accordion',
		'AccordionIconBlock'
	);

	if ( ! hasSupport ) {
		return [];
	}

	const supportBlocks = select( 'core/blocks' ).getBlockSupport(
		'blockparty/accordion',
		'AccordionIconBlock'
	);

	if (
		! Array.isArray( supportBlocks ) ||
		typeof supportBlocks[ 0 ] === 'undefined'
	) {
		return [];
	}

	return supportBlocks;
}

export default function Edit( { attributes, setAttributes, context = {} } ) {
	const registeredIconBlocks = getRegisteredIconBlocks(
		getAdditionalIconBlocksFromSupport()
	);
	const hasIconBlock = registeredIconBlocks.length > 0;
	const templateIconBlock = registeredIconBlocks[ 0 ];
	const { hasIcon, label, headingLevel: savedHeadingLevel } = attributes;
	const headingLevel =
		context[ 'blockparty/headingLevel' ] ?? savedHeadingLevel ?? 3;
	const HeadingTag = `h${ headingLevel }`;

	return (
		<>
			<BlockControls key="toolbar">
				<ToolbarGroup>
					<ToolbarButton
						icon={ shapes }
						label={ __( 'Icon', 'blockparty-accordion' ) }
						className={ hasIcon ? 'is-pressed' : '' }
						isDisabled={ ! hasIconBlock }
						onClick={ () => {
							setAttributes( { hasIcon: ! hasIcon } );
						} }
					/>
				</ToolbarGroup>
			</BlockControls>
			<HeadingTag { ...useBlockProps() }>
				{ hasIcon && hasIconBlock && (
					<InnerBlocks
						allowedBlocks={ registeredIconBlocks }
						__experimentalDirectInsert={ false }
						templateLock={ false }
						template={ [
							[
								templateIconBlock,
								getIconTemplateAttributes( templateIconBlock ),
							],
						] }
						templateInsertUpdatesSelection={ false }
						directInsert={ false }
						renderAppender={ false }
					/>
				) }
				<RichText
					tagName="span"
					className="wp-block-blockparty-accordion-trigger"
					allowedFormats={ [
						'core/image',
						'core/italic',
						'core/bold',
					] }
					value={ label }
					placeholder={ __( 'Summary…', 'blockparty-accordion' ) }
					onChange={ ( content ) => {
						setAttributes( { label: content } );
					} }
				/>
			</HeadingTag>
		</>
	);
}
