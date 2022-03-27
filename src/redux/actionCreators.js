import  * as actionTypes from './actionTypes';
import {isParamNotInBlockList} from '../utilities/validators';
import {generateMetadata} from '../rarity/palettes';
import * as Colors from '@mui/material/colors';

const {WALLET_OK, WALLET_ERROR, CONTROLLER_CHANGE_AMOUNT, CONTROLLER_UPDATE_NOTIFICATION, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_ASSET, CONTROLLER_CHANGE_APP_SCREEN, THEME_SWITCH} = actionTypes;


const testAccount = {
    network: 'eth',
    name: 'jaimelias',
    settings: {
        themeConfig: {
            backgroundColor: 'dark',
            actionColor: '#ffcc00',
        },
        disableGoBackButton: true,
		profileNFT: {
			src: ''
		},
        callbackURL: '',
        webookUrl: ''
    },
    data: {
        eth: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            assets: ['usdt', 'usdc', 'eth', 'xaut', 'dai', 'ust', 'wbtc']
        },
        bsc: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            assets: ['usdt', 'usdc', 'bnb', 'busd']
        },
        matic: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            assets: ['usdt', 'usdc', 'matic']
        },
        btc: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            assets: ['btc'],
            memo: 'XYZ'
        },
        sol: {
            address: '5mC53LninALGCPBcxb3Uikzq2KvsJ5S37zw4Kib64xYb',
            assets: ['usdt', 'usdc', 'sol']
        },
        ada: {
            address: 'addr_test1qz027j4ygr4uva5sfjmjn45twql3uqdm77fyqkgs9kktygv3hec9806pfc8kendffflwytnqz9h3x0pcka5q5k44z00shk3dff',
            assets: ['ada']
        }
    }
};

export const dispatchInputChanges = ({type, payload}) => dispatch => {
    dispatch({type, payload});
};

export const fetchWallet = walletNameParam => dispatch => {


    isParamNotInBlockList(walletNameParam).then(validWalletName => {
        if(validWalletName)
        {
            dispatch({type: WALLET_OK, payload: testAccount});
        }
        else {
            dispatch({type: WALLET_ERROR, payload: `wallet ${walletNameParam} not found`});
        }
    });

};

export const updateNotification = payload => dispatch => {
    dispatch({type: CONTROLLER_UPDATE_NOTIFICATION, payload});
};

export const ResetWallet = ({dispatchInputChanges}) => {
    dispatchInputChanges({
        type: CONTROLLER_SELECT_NETWORK,
        payload: {network: '', assets: {}}
    });

    dispatchInputChanges({
        type: CONTROLLER_SELECT_ASSET,
        payload: ''
    });

    dispatchInputChanges({
        type: CONTROLLER_CHANGE_AMOUNT,
        payload: ''
    });

    dispatchInputChanges({
        type: CONTROLLER_CHANGE_APP_SCREEN,
        payload: 'app.payment.1'
    });	
};

export const switchTheme = payload => dispatch => {

    const palettes = generateMetadata();
    const palettesLenght = palettes.length;
    const bgRandomIndex = 0 || Math.floor(Math.random() * palettesLenght);
    const palette = palettes[bgRandomIndex];

    const {
        mode, 
        background_color, 
        background_color_index,
        background_shade,
        background_shade_index,
        primary_color,
        primary_color_index,
        primary_shade,
        primary_shade_index,
        primary_contrast_text,
        secondary_color,
        secondary_color_index,
        secondary_shade,
        secondary_shade_index,
        secondary_contrast_text
    } = palette;

    const theme = {
        mode,
        primary: {
            main: Colors[primary_color][primary_shade],
            contrastText: primary_contrast_text,
            args: {
                color: primary_color,
                shade: primary_shade,
                colorIndex: primary_color_index,
                shadeIndex: primary_shade_index
            }
        },
        secondary: {
          main:   Colors[secondary_color][secondary_shade],
          contrastText: secondary_contrast_text,
          args: {
              color: secondary_color,
              shade: secondary_shade,
              colorIndex: secondary_color_index,
              shadeIndex: secondary_shade_index
          }
        },
        background: {
            default: Colors[background_color][background_shade],
            args: {
                color: background_color,
                shade: background_shade,
                colorIndex: background_color_index,
                shadeIndex: background_shade_index
            }
        }
    }

    dispatch({type: THEME_SWITCH, payload: theme});


}