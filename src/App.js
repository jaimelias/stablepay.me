import React from 'react';
import './App.css';
import "@fontsource/raleway";
import  { Provider } from 'react-redux';
import { Outlet, useParams } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
import * as Config from './assets/config';
import {validateWalletParams} from './utilities/validators';


const store = ConfigureStore();

export const App = () => {

	const Params = useParams();

	const constextObj = {UrlParams: validateWalletParams({Config, Params})};

	return (

		<Provider store={store}>
			<Outlet context={{...constextObj, Config}}/>
					
		</Provider>
	);
};