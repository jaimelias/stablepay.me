import * as actionTypes from './actionTypes';

export const Wallet = (state = {
    status: 'loading',
    errMess: '',
    attempt: 1,
    data: {}
}, action) => {
    switch (action.type)
    {
        case actionTypes.WALLET_OK:
            return { ...state, status: 'ok', errMess: '', data: action.payload };

        case actionTypes.WALLET_LOADING:
            return { ...state, status: 'loading', errMess: '', data: {} };

        case actionTypes.WALLET_ERROR:
            return { ...state, status: 'error', errMess: action.payload, data: {} };
        default: 
            return state;
    }
}; 