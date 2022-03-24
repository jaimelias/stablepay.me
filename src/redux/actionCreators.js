import  * as actionTypes from './actionTypes';
import {isParamNotInBlockList} from '../utilities/validators';
import {generateMetadata} from '../rarity/palettes';

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
            assets: ['usdt', 'usdc', 'bnb']
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


    console.log(generateMetadata());

    return false;


    const file = '/json/validColors.json';

    return fetch(file).then(response => {
        if(response.ok)
        {
            return response.json();
        }
        else
        {
            throw Error(`${file} not found or not accesible`);
        }
    }).then(palettes => {

        let palette = {};
        const palettesLenght = palettes.length;
        const bgRandomIndex = Math.floor(Math.random() * palettesLenght);
        const background = palettes[bgRandomIndex];

        console.log(JSON.stringify(palettes));
            
        palette = {
            mode: background.mode,
            background: {
                default: background.colors.hex
            }
        }

        dispatch({type: THEME_SWITCH, payload: palette});

    }).catch(err => {
        console.log(err.message);
    });
}