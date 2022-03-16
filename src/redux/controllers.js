import * as actionTypes from './actionTypes';

export const Controllers = (state = {
    amount: '',
    network: '',
    asset: '',
    assets: {},
    appScreen: 'app.payment.1',
	notification: {
		open: false,
		message: ''
	}
}, action) => {

    const {payload} = action;

    switch (action.type)
    {
        case actionTypes.CONTROLLER_CHANGE_AMOUNT:
            return { ...state, amount: payload };
        case actionTypes.CONTROLLER_SELECT_NETWORK:
            const {network, assets} = payload;
            return { ...state, network, assets };
        case actionTypes.CONTROLLER_SELECT_ASSET:
            return { ...state, asset: payload };
        case actionTypes.CONTROLLER_CHANGE_APP_SCREEN:
            return { ...state, appScreen: payload };
        case actionTypes.CONTROLLER_UPDATE_NOTIFICATION:
            return { ...state, notification: {...payload} };
        default: 
            return state;
    }
}; 