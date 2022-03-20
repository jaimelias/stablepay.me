import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges, updateNotification} from '../redux/actionCreators';
import {NotificationComponent} from './elements/appElements';
import { Outlet } from 'react-router-dom';


const mapDispatchToProps = dispatch => (
{
	fetchWallet: walletNameParam => dispatch(fetchWallet(walletNameParam)),
	dispatchInputChanges: ({type, payload}) => dispatch(dispatchInputChanges({type, payload})),
	updateNotification: payload => dispatch(updateNotification(payload))
});

const mapStateToProps = state => ({
	Wallet: state.Wallet,
	Controllers: state.Controllers
});


class MainComponent extends Component {

	componentDidMount() {
		const {walletNameParam} = this.props;
		setTimeout(() => this.props.fetchWallet(walletNameParam), 1000);
	}

	render() {

		const {Controllers, Wallet, UrlParams, dispatchInputChanges, updateNotification, Config} = this.props;
		const {notification} = Controllers;

		console.log(UrlParams);
		
		return (<>

			<Outlet context={{Controllers, Wallet, UrlParams, dispatchInputChanges, updateNotification, Config}} />	

			<NotificationComponent 
                updateNotification={updateNotification}
                notification={notification}
                />
			
		</>)

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);