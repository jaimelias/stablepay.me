import * as actionTypes from './actionTypes';
import { themeConfig } from '../assets/theme';

export const Theme = (state = {
    status: 'default',
    config: themeConfig,
}, action) => {
    switch (action.type)
    {
        case actionTypes.THEME_SWITCH:
            return { ...state, config: {...state.config, palette: {...state.config.palette, ...action.payload}}, status: 'changed' };
        default: 
            return state;
    }
};