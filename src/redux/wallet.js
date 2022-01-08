import * as actionTypes from './actionTypes';

export const Wallet = (state = {
    status: 'loading',
    errMess: null,
    data: []
}, action) => {
    switch (action.type)
    {
        case actionTypes.WALLET_OK:
            return { ...state, status: 'ok', errMess: null, data: action.payload };

        case actionTypes.WALLET_LOADING:
            return { ...state, status: 'loading', errMess: null, data: [] };

        case actionTypes.WALLET_ERROR:
            return { ...state, status: 'error', errMess: action.payload, data: [] };

        default: 
            return state;
    }
}; 