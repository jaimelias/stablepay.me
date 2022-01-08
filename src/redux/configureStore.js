import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Wallet } from './wallet';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
 
        combineReducers({
            wallet: Wallet
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};