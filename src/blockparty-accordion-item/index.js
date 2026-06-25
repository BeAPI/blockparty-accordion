import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { accordionItem } from '@beapi/icons';

registerBlockType(metadata.name, {
	...metadata,
	icon: accordionItem,
	edit: Edit,
	save,
});
