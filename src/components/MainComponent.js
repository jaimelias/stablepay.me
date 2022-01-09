import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet} from '../redux/actionCreators';
import { EnterAmountInput } from './Elements';

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
				<h1>{walletPath}</h1>
				<EnterAmountInput Controllers={Controllers}/>
			</>
		);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);