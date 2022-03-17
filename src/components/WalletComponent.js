import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges, updateNotification} from '../redux/actionCreators';
import WalletNotFoundComponent from './WalletNotFoundComponent';
import Transaction from './transaction/TransactionComponent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import {NotificationComponent} from './elements/appElements';
import AvatarComponent from './elements/AvatarComponent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



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



class WalletComponent extends Component {

	componentDidMount() {
		const {walletNameParam} = this.props;
		setTimeout(() => this.props.fetchWallet(walletNameParam), 1000);
	}

	render() {

		const {Controllers, Wallet, walletNameParam, networkParam, assetParam, amountParam, walletParamError, dispatchInputChanges, updateNotification, Config} = this.props;
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

							{walletParamError ? <>
								<Button
									component={Link}
									size='small'
									to={`/${Wallet.data.name}`}
									fullWidth
									type="button"
									variant='contained'
									>{'Reload the App'}</Button>
							</> : <>
								<Transaction 
									Controllers={Controllers} 
									Wallet={Wallet}
									amountParam={amountParam} 
									networkParam={networkParam} 
									assetParam={assetParam} 
									dispatchInputChanges={dispatchInputChanges}
									updateNotification={updateNotification}
									Config={Config}
									/>							
							</>}	
				</> : ''}

				{status === 'error' ? <><WalletNotFoundComponent walletNameParam={walletNameParam} /></> : ''}

				<NotificationComponent 
							updateNotification={updateNotification}
							notification={notification}
							/>
			</Paper>

		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletComponent);