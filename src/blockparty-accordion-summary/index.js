import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { accordionTitle } from '@beapi/icons';

registerBlockType(metadata.name, {
	icon: accordionTitle,
	edit: Edit,
	save,
});
