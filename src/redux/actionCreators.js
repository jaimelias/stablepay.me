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
        allowMainCoins: false,
        callbackURL: '',
        webookUrl: ''
    },
    data: {
        eth: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            coins: ['usdt', 'usdc']
        },
        bnb: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            coins: ['usdt', 'usdc']
        },
        matic: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            coins: ['usdt', 'usdc']
        },
        btc: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            memo: 'XYZ'
        }
    }
};

export const dispatchInputChanges = ({type, payload}) => dispatch => {
    dispatch({type, payload});
};

export const fetchWallet = () => dispatch => {

    const fetchWalletOk = payload => ({type: actionTypes.WALLET_OK, payload});
    //const fetchWalletError = payload => ({type: actionTypes.WALLET_ERROR, payload});

    dispatch(fetchWalletOk(testAccount));
};

