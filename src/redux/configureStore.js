import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Wallet } from './wallet';
import { Controllers } from './controllers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
 
        combineReducers({
           Wallet,
           Controllers
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};