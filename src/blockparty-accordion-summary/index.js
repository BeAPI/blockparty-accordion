import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { title } from '@beapi/icons';

registerBlockType(metadata.name, {
	icon: title,
	edit: Edit,
	save,
});
