import  * as actionTypes from './actionTypes';

export const dispatchInputChanges = ({type, payload}) => dispatch => {
    dispatch({type, payload});
};

export const fetchWallet = () => dispatch => {

    const fetchWalletOk = payload => ({type: actionTypes.WALLET_OK, payload});
    //const fetchWalletError = payload => ({type: actionTypes.WALLET_ERROR, payload});

    dispatch(fetchWalletOk({network: 'ethereum', address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5'}));
};

