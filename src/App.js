import React from 'react';
import Main from './components/MainComponent';
import NotFoundWalletPage from './components/NotFoundComponent';
import './App.css';
import  { Provider } from 'react-redux';
import { useParams } from "react-router-dom";
import  { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();

//lower case alphanumerical and dots
const isValidSlug = val => /^[a-z0-9]+(?:.[a-z0-9]+)*$/.test(val);

export const App = () => {
	let {walletPath} = useParams();

	const MainComponent = () => (
		<Provider store={store}>
			<Main walletPath={walletPath}/>
		</Provider>
	);

	const RenderMainComponent = () => (isValidSlug(walletPath)) 

		? <MainComponent  />

		: <NotFoundWalletPage />;

	return (<RenderMainComponent/>);
};