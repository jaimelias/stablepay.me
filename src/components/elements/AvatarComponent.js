import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const  AvatarComponent = ({walletNameParam}) => {	

	return (
		<Box mb={3}>
			<Typography mb={2} variant="h5" component="h1" align="center" >{'@'}{walletNameParam}</Typography>
		</Box>
	);
}