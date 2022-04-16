import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges, updateNotification, switchTheme} from '../redux/actionCreators';
import {NotificationComponent} from './elements/appElements';
import { Outlet } from 'react-router-dom';
import AppBarComponent from './elements/AppBarComponent';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {RecaptchaVerifiedComponent} from '../utilities/recaptcha-v3';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


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
		}, 1000);
	}

	render() {

		const {Controllers, Wallet, UrlParams, dispatchInputChanges, updateNotification, Config, Theme} = this.props;
		const {status} = Wallet;
		const {notification} = Controllers;
		const theme = createTheme(Theme.config);
		const {palette} = theme;

		const verifiedComponent = (
			<>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{status === 'ok' ? <>
						<AppBarComponent palette={palette} />
					</> : ''}
					
					<Outlet context={{Theme, Controllers, Wallet, UrlParams, dispatchInputChanges, updateNotification, Config}} />

				</ThemeProvider>		
			</>
		);
		
		return (<>

			<GoogleReCaptchaProvider reCaptchaKey="6Ld77nkfAAAAAJbWHzIgzO7166yeBMrRkCAuUv6I">
				<RecaptchaVerifiedComponent verifiedComponent={verifiedComponent} updateNotification={updateNotification} />	
			</GoogleReCaptchaProvider>

			<NotificationComponent 
				updateNotification={updateNotification}
				notification={notification}
				palette={palette}
				/>
		</>)

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);