import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges} from '../redux/actionCreators';
import { DisplayStableLogos } from './appElements';
import PaymentForm from './PaymentFormComponent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
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
		this.props.fetchWallet();
	}
	render() {

		const {Controllers, walletPath, pathAmount, dispatchInputChanges} = this.props;

		return (
			<>
				<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

					<Typography mb={3} variant="h5" component="h1" align="center">{walletPath}</Typography>
					
					<PaymentForm 
						Controllers={Controllers} 
						pathAmount={pathAmount} 
						dispatchInputChanges={dispatchInputChanges} 
						Config={Config}
						/>

				</Paper>

				<DisplayStableLogos />
			</>
		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);