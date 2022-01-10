import React from 'react';
import Main from './components/MainComponent';
import NotFoundWallet from './components/NotFoundComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';
import "@fontsource/raleway";
import  { Provider } from 'react-redux';
import { useParams } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
import {isValidSlug, isValidAmountTyping, isInvalidAmountString} from './utilities/utilities';
import {themeConfig} from './assets/theme';
const store = ConfigureStore();

const theme = createTheme(themeConfig);

export const App = () => {
	const {walletPath, amount} = useParams();

	const MainComponent = () => (
		<Provider store={store}>
			<Main walletPath={walletPath}  slugAmount={amount} />
		</Provider>
	);

	const RenderMainComponent = () => (isValidSlug(walletPath)) 

		? <MainComponent />

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