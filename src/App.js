import React from 'react';
import './App.css';
import "@fontsource/raleway";
import  { Provider } from 'react-redux';
import { Outlet, useParams } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
import * as Config from './assets/config';
import {validateWalletParams} from './utilities/validators';
import { MoralisProvider } from "react-moralis";

const store = ConfigureStore();



export const App = () => {

	const Params = useParams();
	const constextObj = {UrlParams: validateWalletParams({Config, Params})};

	return (
		<MoralisProvider serverUrl="https://hepiqowzi15v.usemoralis.com:2053/server" appId="wdxGqDslKg2m84Q9OY3dzLIxGAb5a4lzEtXM7kMs">
			<Provider store={store}>
					<Outlet context={{...constextObj, Config}}/>
			</Provider>	
		</MoralisProvider>
	);
};