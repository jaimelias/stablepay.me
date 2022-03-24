import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges, updateNotification, switchTheme} from '../redux/actionCreators';
import {NotificationComponent} from './elements/appElements';
import { Outlet } from 'react-router-dom';
import AppBarComponent from './elements/AppBarComponent';
import CssBaseline from '@mui/material/CssBaseline';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });



const mapDispatchToProps = dispatch => (
{
	fetchWallet: walletNameParam => dispatch(fetchWallet(walletNameParam)),
	dispatchInputChanges: ({type, payload}) => dispatch(dispatchInputChanges({type, payload})),
	updateNotification: payload => dispatch(updateNotification(payload)),
	switchTheme: payload => dispatch(switchTheme(payload)),
});

const mapStateToProps = state => ({...state});


class MainComponent extends Component {

	componentDidMount() {
		const {fetchWallet, switchTheme, UrlParams} = this.props;

		const {walletNameParam} = UrlParams;

		setTimeout(() => {
			fetchWallet(walletNameParam);
			switchTheme();
		}, 500);
	}

	render() {

		const {Controllers, Wallet, UrlParams, dispatchInputChanges, updateNotification, Config, Theme} = this.props;
		const {notification} = Controllers;
		
		const theme = createTheme(Theme.config);
		
		return (<>

			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBarComponent />

				<Outlet context={{Theme, Controllers, Wallet, UrlParams, dispatchInputChanges, updateNotification, Config}} />	

				<NotificationComponent 
					updateNotification={updateNotification}
					notification={notification}
					/>
			</ThemeProvider>
		</>)

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);