import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { accordion } from '@beapi/icons';

registerBlockType(metadata.name, {
	icon: accordion,
	edit: Edit,
	save,
});
