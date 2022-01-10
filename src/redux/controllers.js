import * as actionTypes from './actionTypes';

export const Controllers = (state = {
    status: 'loading',
    amount: '',
    network: ''
}, action) => {
    switch (action.type)
    {
        case actionTypes.CONTROLLER_CHANGE_AMOUNT:
            return { ...state, amount: action.payload };
        case actionTypes.CONTROLLER_SELECT_NETWORK:
            return { ...state, network: action.payload };
        case actionTypes.CONTROLLER_SELECT_STABLECOIN:
            return { ...state, stablecoin: action.payload };
        default: 
            return state;
    }
}; 