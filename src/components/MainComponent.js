import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {fetchWallet} from '../redux/actionCreators';


const mapDispatchToProps = (dispatch) => (
{
	fetchWallet: () => dispatch(fetchWallet())
});

const mapStateToProps = state => ({
	wallet: state.wallet
});

class Main extends Component {

	componentDidMount() {
		this.props.fetchWallet();
	}
	render() {

		console.log(this.props);

		return (<h1>Wallet Page</h1>);

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);