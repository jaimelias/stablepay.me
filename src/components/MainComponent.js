import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges} from '../redux/actionCreators';
import PaymentForm from './PaymentFormComponent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import * as Config from '../assets/config';

const mapDispatchToProps = dispatch => (
{
	fetchWallet: () => dispatch(fetchWallet()),
	dispatchInputChanges: ({type, payload}) => dispatch(dispatchInputChanges({type, payload}))
});

const mapStateToProps = state => ({
	Wallet: state.Wallet,
	Controllers: state.Controllers
});

class Main extends Component {

	componentDidMount() {
		setTimeout(() => this.props.fetchWallet(), 3000);
	}
	render() {

		const {Controllers, Wallet, walletPath, networkPath, coinPath, amountPath, dispatchInputChanges} = this.props;

		return (
			<>
				<Paper variant="outlined" sx={{width: '400px', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

					<Typography mb={3} variant="h5" component="h1" align="center">{walletPath}</Typography>
					
					{Wallet.status === 'ok' ?	
						<>
							<PaymentForm 
								Controllers={Controllers} 
								Wallet={Wallet}
								amountPath={amountPath} 
								networkPath={networkPath} 
								coinPath={coinPath} 
								dispatchInputChanges={dispatchInputChanges} 
								Config={Config}
								/>
						</>
					: ''}


					{Wallet.status === 'loading' ?	
						<Box sx={{my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<CircularProgress />
						</Box>
					: ''}					


				</Paper>
			</>
		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);