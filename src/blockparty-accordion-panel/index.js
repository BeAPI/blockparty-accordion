import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { contents } from '@wordpress/icons';

registerBlockType(metadata.name, {
	...metadata,
	icon: contents,
	edit: Edit,
	save,
});
