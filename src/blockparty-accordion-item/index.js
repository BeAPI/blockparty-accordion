import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { item } from '@beapi/icons';

registerBlockType(metadata.name, {
	icon: item,
	edit: Edit,
	save,
});
