import * as actionTypes from './actionTypes';

const {WALLET_OK, WALLET_LOADING, WALLET_ERROR} = actionTypes;

export const Wallet = (state = {
    status: 'loading.wallet',
    errMess: '',
    failedAttempts: {
        wallet: 0
    },
    data: {}
}, action) => {

    const {payload} = action;
    let {failedAttempts} = state;

    switch (action.type)
    {
        case actionTypes.WALLET_OK:
            failedAttempts = {...failedAttempts, wallet: 0};
            return { ...state, status: 'ok.wallet', errMess: '', data: payload, failedAttempts };
        case actionTypes.WALLET_LOADING:
            return { ...state, status: 'loading.wallet', errMess: '', data: {} };
        case actionTypes.WALLET_ERROR:
            failedAttempts = {...failedAttempts, wallet: (failedAttempts.wallet++)}
            return { ...state, status: 'error.wallet', errMess: payload, data: {}, failedAttempts };
        default: 
            return state;
    }
};