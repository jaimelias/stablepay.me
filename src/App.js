import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './App.css';
import "@fontsource/raleway";
import  { Provider } from 'react-redux';
import { Outlet, useParams } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
import {themeConfig} from './assets/theme';
import * as Config from './assets/config';
import {validateWalletParams} from './utilities/utilities';
import { MoralisProvider } from "react-moralis";


const store = ConfigureStore();

const theme = createTheme(themeConfig);

export const App = () => {

	const Params = useParams();
	const constextObj = {UrlParams: validateWalletParams({Config, Params})};

	return (
		<ThemeProvider theme={theme}>
			
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				
					<MoralisProvider serverUrl="https://hepiqowzi15v.usemoralis.com:2053/server" appId="wdxGqDslKg2m84Q9OY3dzLIxGAb5a4lzEtXM7kMs">
						<Provider store={store}>
								<Outlet context={{...constextObj, Config}}/>
						</Provider>	
					</MoralisProvider>
			</Container>
			
		</ThemeProvider>
	);
};