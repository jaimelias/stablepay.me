import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges, updateNotification} from '../redux/actionCreators';
import NotFoundWallet from './NotFoundComponent';
import Transaction from './transaction/TransactionComponent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import {NotificationComponent} from './elements/appElements';
import AvatarComponent from './elements/AvatarComponent';
import * as Config from '../assets/config';


const mapDispatchToProps = dispatch => (
{
	fetchWallet: walletPath => dispatch(fetchWallet(walletPath)),
	dispatchInputChanges: ({type, payload}) => dispatch(dispatchInputChanges({type, payload})),
	updateNotification: payload => dispatch(updateNotification(payload))
});

const mapStateToProps = state => ({
	Wallet: state.Wallet,
	Controllers: state.Controllers
});



class WalletComponent extends Component {

	componentDidMount() {
		const {walletPath} = this.props;
		setTimeout(() => this.props.fetchWallet(walletPath), 1000);
	}

	render() {

		const {Controllers, Wallet, walletPath, networkPath, assetPath, amountPath, dispatchInputChanges, updateNotification} = this.props;
		const {notification} = Controllers;
		const {status} = Wallet;

		return (

			<Paper variant="outlined" sx={{width: '400px', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
				{status === 'loading' ? <>
					<Box sx={{my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<CircularProgress />
					</Box>
				</> : '' }
			
				{status === 'ok' ? <>

							<AvatarComponent Wallet={Wallet} />
		
							<Transaction 
								Controllers={Controllers} 
								Wallet={Wallet}
								amountPath={amountPath} 
								networkPath={networkPath} 
								assetPath={assetPath} 
								dispatchInputChanges={dispatchInputChanges}
								updateNotification={updateNotification}
								Config={Config}
								/>
			
							
				</> : ''}

				{status === 'error' ? <><NotFoundWallet walletPath={walletPath} /></> : ''}


				<NotificationComponent 
							updateNotification={updateNotification}
							notification={notification}
							/>
			</Paper>

		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletComponent);