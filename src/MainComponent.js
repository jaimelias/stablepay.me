import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Outlet  } from "react-router-dom";
//import {isValidSlug} from './utilities/utilities';


export const MainComponent = () => {

	return (
		<Container component="main" maxWidth="xs">
			<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Outlet />
			</Box>
		</Container>
	);
};