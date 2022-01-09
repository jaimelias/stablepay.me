import * as actionTypes from './actionTypes';

export const Controllers = (state = {
    status: 'loading',
    amount: ''
}, action) => {
    switch (action.type)
    {
        case actionTypes.CONTROLLER_CHANGE_AMOUNT:
            return { ...state, amount: action.payload };
        default: 
            return state;
    }
}; 