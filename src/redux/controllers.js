import * as actionTypes from './actionTypes';

export const Controllers = (state = {
    amount: '',
    network: '',
    coin: '',
    coins: {},
    appScreen: 'app.payment.1',
}, action) => {
    switch (action.type)
    {
        case actionTypes.CONTROLLER_CHANGE_AMOUNT:
            return { ...state, amount: action.payload };
        case actionTypes.CONTROLLER_SELECT_NETWORK:
            const {network, coins} = action.payload;
            return { ...state, network, coins };
        case actionTypes.CONTROLLER_SELECT_COIN:
            return { ...state, coin: action.payload };
        case actionTypes.CONTROLLER_CHANGE_APP_SCREEN:
            return { ...state, appScreen: action.payload };
        default: 
            return state;
    }
}; 