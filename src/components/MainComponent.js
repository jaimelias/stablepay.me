import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet, dispatchInputChanges} from '../redux/actionCreators';
import { DisplayStableLogos } from './appElements';
import PaymentForm from './PaymentFormComponent';
import Typography from '@mui/material/Typography';
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
				<Typography my={2} variant="h4" component="h1">{walletPath}</Typography>
				
				<PaymentForm 
					Controllers={Controllers} 
					pathAmount={pathAmount} 
					dispatchInputChanges={dispatchInputChanges} 
					Config={Config}
					/>

				<DisplayStableLogos />
			</>
		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);