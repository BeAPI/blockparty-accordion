import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { SVG, Path, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { select } from '@wordpress/data';
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
						icon={
							<SVG
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
							>
								<Path d="M6 9.5h3.5V6H6v3.5Zm5 .5a1 1 0 0 1-.898.995L10 11H5.5l-.103-.005a1 1 0 0 1-.892-.893L4.5 10V5.5a1 1 0 0 1 1-1H10a1 1 0 0 1 1 1V10ZM18.25 7.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm1.5 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM6.88 13.535a1 1 0 0 1 1.74 0l2.534 4.472a1 1 0 0 1-.87 1.493H5.216a1 1 0 0 1-.87-1.493l2.534-4.472ZM6.074 18h3.352L7.75 15.041l-1.676 2.96ZM14.952 13h2.596a1 1 0 0 1 .866.5l1.298 2.25a1 1 0 0 1 0 1L18.414 19l-.074.11a1 1 0 0 1-.792.39h-2.596a1 1 0 0 1-.792-.39l-.074-.11-1.298-2.25a1.001 1.001 0 0 1 0-1l1.298-2.25a1 1 0 0 1 .866-.5Zm-.72 3.25 1.01 1.75h2.017l1.009-1.75-1.01-1.75h-2.017l-1.01 1.75Z" />
							</SVG>
						}
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
