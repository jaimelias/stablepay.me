import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';
import "@fontsource/raleway";
import  { Provider } from 'react-redux';
import { Outlet, useParams } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
import {themeConfig} from './assets/theme';
import * as Config from './assets/config';
import {isValidSlug, isInvalidAmountString} from './utilities/utilities';

const {networks, assets} = Config;

const store = ConfigureStore();

const theme = createTheme(themeConfig);

export const App = () => {

	const {walletPath = '', networkPath = '', assetPath = '', amountPath = ''} = useParams();
	const filterWalletPath = (isValidSlug(walletPath)) ? walletPath : '';
	const filterNetworkPath = (isValidSlug(networkPath)) ? (networks.hasOwnProperty(networkPath)) ? networkPath : '' : '';
	let filterAmountPath = (!isInvalidAmountString(amountPath)) ? amountPath : '';
	let pathError = false;
	
	const findAssetPath = () => {
  
	  let output = '';
  
	  if(filterNetworkPath)
	  {
		const {mainCoin} = networks[filterNetworkPath];

		if(isValidSlug(assetPath))
		{
			if(assets.hasOwnProperty(assetPath))
			{
				if(assets[assetPath].addresses.hasOwnProperty(filterNetworkPath))
				{
					output = assetPath;
				}
			}
			else
			{
				if(assets[mainCoin].addresses.hasOwnProperty(filterNetworkPath))
				{
					if(assets[mainCoin].addresses[filterNetworkPath] === true)
					{
						output = mainCoin;
					}
				}
			}
		}
		else {

			if(isValidSlug(amountPath))
			{
				if(filterAmountPath)
				{
					if(assetPath !== '' || mainCoin === filterNetworkPath)
					{
						if(assets.hasOwnProperty(mainCoin))
						{
							if(assets[mainCoin].addresses.hasOwnProperty(filterNetworkPath))
							{
								output = mainCoin;
							}
						}
					}
				}
				else{

					if(assets.hasOwnProperty(amountPath))
					{
						if(assets[amountPath].addresses.hasOwnProperty(filterNetworkPath))
						{
							output = amountPath;
						}
						else
						{
							console.log('assetPath not found in network');
							pathError = true;
							output = mainCoin;
						}
					}
					else
					{
						console.log('invalid assetPath');
						pathError = true;
						output = mainCoin;
					}
				}
			}
			else
			{
				if(filterAmountPath !== '')
				{
					if(assets[mainCoin].addresses.hasOwnProperty(filterNetworkPath))
					{
						if(assets[mainCoin].addresses[filterNetworkPath] === true)
						{
							output = mainCoin;
						}
					}
				}
			}			
		}

	  }

	  return output;
	};

	const filterAssetPath = findAssetPath();
	filterAmountPath = (filterWalletPath && filterNetworkPath && filterAssetPath && filterAmountPath) ? amountPath : '';


	const constextObj = {
		pathError,
		walletPath: filterWalletPath, 
		networkPath: filterNetworkPath, 
		assetPath: filterAssetPath, 
		amountPath: filterAmountPath,
		Config: {...Config, pathError}
	};


	return (
		<ThemeProvider theme={theme}>
			
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<Provider store={store}>
						<Outlet context={constextObj}/>
					</Provider>	
				</Box>
			</Container>
			
		</ThemeProvider>
	);
};