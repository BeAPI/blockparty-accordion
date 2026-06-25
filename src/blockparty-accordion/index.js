import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';
import { accordion } from '@beapi/icons';

registerBlockType(metadata.name, {
	...metadata,
	icon: accordion,
	edit: Edit,
	save,
	deprecated,
});
