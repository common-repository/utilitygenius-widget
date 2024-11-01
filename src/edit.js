import { useState } from 'react';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */


// MJ's Warez
import { Button, MenuItem, Select } from '@mui/material';
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import logo from './utility_genius_logo.svg';
import { Container } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


export default function Edit({ attributes, setAttributes }) {

	const { widgetToken, widgetType } = attributes;
	const [ isInEditMode, setIsInEditMode ] = useState(false);
	// keep state values for the form inputs - so the user can cancel without impacting the stored block attributes
	const [ userInputToken, setUserInputToken ] = useState(widgetToken);
	const [ userInputType, setUserInputType ] = useState(widgetType);


	function setWidgetToken(token) {
		setAttributes({ widgetToken: token });
	}

	function setWidgetType(type) {
		setAttributes({ widgetType: type });
	}

	function saveUpdateForm(ev) {
		ev.stopPropagation();
		ev.preventDefault();

		setWidgetToken(userInputToken);
		setWidgetType(userInputType);
		setIsInEditMode(false);
	}

	function cancelUpdateForm() {
		setUserInputToken(widgetToken);
		setUserInputType(widgetType);
		setIsInEditMode(false);
	}

	if(isInEditMode) {
		return (
			<div {...useBlockProps()}>
				<CssBaseline>
					<Container>
						<Box display="flex" justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
							<img width={300} src={logo} />
							<FormControl fullWidth sx={{mb: 2, height: 75}}> 
								<InputLabel for='#ug_widget_token_input'>Enter Your Widget Token: </InputLabel>
								<Input disableUnderline id='ug_widget_token_input' type='text' value={userInputToken} onChange={(e) => setUserInputToken(e.currentTarget.value)} />
							</FormControl>
							<FormControl fullWidth>
								<InputLabel for='#ug_widget_type_select'>Select Your Widget Type: </InputLabel>
								<Select
								sx={{mt: 2}} 
									size='small'
									defaultValue=""
									id='ug_widget_type_select' 
									value={userInputType}
									onChange={(e) => setUserInputType(e.target.value)}>
									<MenuItem value={'Full Page'} selected={userInputType === 'Full Page'}>Full Page</MenuItem>
									<MenuItem value={'Ad'} selected={userInputType === 'Ad'}>Ad Size</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box display="flex" justifyContent="center" alignItems="center" sx={{ flexDirection: 'row', mt: 2 }}>
							<Button variant="outlined" color="success" sx={{minWidth: 150, padding: 1, mr: 1}} 
							onClick={cancelUpdateForm}>
								Cancel
							</Button>
							<Button variant="contained" color="success" sx={{minWidth: 150, padding: 1}} 
							onClick={saveUpdateForm} disabled={userInputToken === null || userInputToken === ''}>
								Save
							</Button>
						</Box>
					</Container>
				</CssBaseline>
			</div>
		);
	}

	if(widgetToken && widgetType) {
		return (
			<div {...useBlockProps()}>
				<CssBaseline>
				<Container>
				<Box display="flex" justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
					<img width={300} src={logo} />
					<h>Widget Token: { widgetToken }</h>
					<p>Widget Type: { widgetType }</p>
					<Button  style={{maxWidth: '200px'}} variant="contained" color="success" 
					onClick={() => setIsInEditMode(true)}>Edit</Button>
				</Box>
				</Container>
				</CssBaseline>
			</div>
		);
	}

	return (
		<div {...useBlockProps()}>
			<CssBaseline>
				<Container>
				<Box display="flex" justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
				<img width={300} src={logo} />
				<Button variant="contained" color="success" onClick={() => setIsInEditMode(true)}>Add Your Widget</Button>
				</Box>
				</Container>
			</CssBaseline>
		</div>
	);
}
