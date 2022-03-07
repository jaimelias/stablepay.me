import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {themeConfig} from '../assets/theme';

const theme = createTheme(themeConfig);

export const HomePage = () => {
    return(
        <ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>HomePage</h1>
				</Box>
			</Container>
		</ThemeProvider>
    );
};