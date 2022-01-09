import  * as actionTypes from './actionTypes';


export const fetchWallet = () => dispatch => {

    const fetchWalletOk = payload => ({type: actionTypes.WALLET_OK, payload});
    const fetchWalletError = payload => ({type: actionTypes.WALLET_ERROR, payload});

    dispatch(fetchWalletOk({hola: 'jaime'}));
};