import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export const UploadFile = (props) => {

	const [file, setFile] = React.useState(undefined)
	const selectFile = (event) => {
		setFile(event.target.files[0])
	}

	React.useEffect(() => {
		if (file) {
			// console.log("You clicked file name" + file.name);
		}
	}, [file]);

	const handleSubmission = () => {
		if (file === undefined) {
			return;
		}
		// Create an object of formData
		const formData = new FormData();
    
		// Update the formData object
		formData.append(
			"file",
			file
		);
	
		// Details of the uploaded file
		console.log(file);
	
		// Request made to the backend api
		// Send formData object
		axios.post("http://127.0.0.1:5000/file-upload", formData);
	};

	return (
		<div>
		<h3> Upload a file!</h3>
		<Stack direction="row" alignItems="center" spacing={2}>
			<label>
				<input
					style={{ display: 'none' }}
					type="file"
					onChange={selectFile} />
				<Button
					size="medium"
					variant="outlined"
					component="span" 
					color="primary">
					Choose file
				</Button>
			</label>
			<br/>
			{/* <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton> */}
			<Button
					size="medium"
					variant="contained"
					color="primary"
					onClick={handleSubmission}
					>
					Upload
			</Button>
		</Stack>
		{
			(file !== undefined) ? 
			(<div>
			<p>Filename: {file.name}</p>
			<p>Filetype: {file.type}</p>
			<p>Size in bytes: {file.size}</p>
			<p>
			lastModifiedDate:{' '}
			{file.lastModifiedDate.toLocaleDateString()}
			</p>
			</div>) : 
			(<div></div>)
		}
		</div>
	);
}