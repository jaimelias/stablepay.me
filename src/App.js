import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';
import "@fontsource/raleway";
import  { Provider } from 'react-redux';
import { Outlet } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
import {themeConfig} from './assets/theme';

const store = ConfigureStore();

const theme = createTheme(themeConfig);

export const App = () => {

	return (
		<ThemeProvider theme={theme}>
			
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<Provider store={store}>
						<Outlet/>
					</Provider>	
				</Box>
			</Container>
			
		</ThemeProvider>
	);
};