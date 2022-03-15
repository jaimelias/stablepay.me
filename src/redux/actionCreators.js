import  * as actionTypes from './actionTypes';


const testAccount = {
    network: 'eth',
    name: 'jaimelias',
    settings: {
        theme: {
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
            assets: ['usdt', 'usdc', 'eth']
        },
        bnb: {
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

export const fetchWallet = walletPath => dispatch => {

      dispatch({type: actionTypes.WALLET_OK, payload: testAccount});
};

export const updateNotification = payload => dispatch => {
    dispatch({type: actionTypes.CONTROLLER_UPDATE_NOTIFICATION, payload});
};