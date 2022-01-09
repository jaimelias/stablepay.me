import React from 'react';
import Main from './components/MainComponent';
import NotFoundWallet from './components/NotFoundComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';
import  { Provider } from 'react-redux';
import { useParams } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();

const theme = createTheme();

//lower case alphanumerical and dots
const isValidSlug = val => /^[a-z0-9]+(?:.[a-z0-9]+)*$/.test(val);

export const App = () => {
	let {walletPath} = useParams();

	const MainComponent = () => (
		<Provider store={store}>
			<Main walletPath={walletPath} />
		</Provider>
	);

	const RenderMainComponent = () => (isValidSlug(walletPath)) 

		? <MainComponent  walletPath={walletPath} />

		: <NotFoundWallet />;

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />

				<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<RenderMainComponent/>
				</Box>
			</Container>
		</ThemeProvider>
	);
};