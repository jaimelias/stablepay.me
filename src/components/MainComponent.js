import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet} from '../redux/actionCreators';
import { EnterAmountInput, DisplayStableLogos } from './Elements';
import Typography from '@mui/material/Typography';


const mapDispatchToProps = dispatch => (
{
	fetchWallet: () => dispatch(fetchWallet())
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

		const {Controllers, walletPath} = this.props;

		return (
			<>
				<Typography my={2} variant="h4" component="h1">{walletPath}</Typography>
				<EnterAmountInput Controllers={Controllers}/>
				<DisplayStableLogos />
			</>
		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);