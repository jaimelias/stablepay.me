import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet} from '../redux/actionCreators';
import { EnterAmountForm, DisplayStableLogos } from './appElements';
import Typography from '@mui/material/Typography';
import  {isValidAmountTyping, isInvalidAmountString} from '../utilities/utilities';

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

		const {Controllers, walletPath, slugAmount} = this.props;

		return (
			<>
				<Typography my={2} variant="h4" component="h1">{walletPath}</Typography>
				
				<EnterAmountForm Controllers={Controllers} slugAmount={slugAmount}/>

				<DisplayStableLogos />
			</>
		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);