import  * as actionTypes from './actionTypes';
import Moralis from 'moralis';

Moralis.start({
    serverUrl: 'https://hepiqowzi15v.usemoralis.com:2053/server', 
    appId: 'wdxGqDslKg2m84Q9OY3dzLIxGAb5a4lzEtXM7kMs'
});


const testAccount = {
    network: 'eth',
    name: 'jaimelias',
    description: 'hola, este es el wallet de Jaime Castillo fundador de Aero Albrook y Panama Jet Hub en Panamá es el wallet de Jaime es el wallet de Jaime es el wallet',
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
            coins: ['usdt', 'usdc', 'eth']
        },
        bnb: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            coins: ['usdt', 'usdc', 'bnb']
        },
        matic: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            coins: ['usdt', 'usdc', 'matic']
        },
        btc: {
            address: '0xAb88E902Ae4a49Db58d9D953Fbe59efd00512DC5',
            coins: ['btc'],
            memo: 'XYZ'
        },
        sol: {
            address: '5mC53LninALGCPBcxb3Uikzq2KvsJ5S37zw4Kib64xYb',
            coins: ['usdt', 'usdc', 'sol']
        },
        ada: {
            address: 'addr_test1qz027j4ygr4uva5sfjmjn45twql3uqdm77fyqkgs9kktygv3hec9806pfc8kendffflwytnqz9h3x0pcka5q5k44z00shk3dff',
            coins: ['ada']
        }
    }
};

export const dispatchInputChanges = ({type, payload}) => dispatch => {
    dispatch({type, payload});
};

export const fetchWallet = walletPath => dispatch => {

    let user = Moralis.User.current();

    if (!user) {
        user = Moralis.authenticate({ signingMessage: "Log in using Moralis" })
          .then(user => {

            const userAddress = user.get('ethAddress');
            const payload = {...testAccount, ...user, userAddress};

            dispatch({type: actionTypes.WALLET_OK, payload});
          })
          .catch(error => {
            dispatch({type: actionTypes.WALLET_ERROR, payload: {errMess: error.message}});
          });
      }
      else{
        const userAddress = user.get('ethAddress');
        const payload = {...testAccount, ...user, userAddress};

        dispatch({type: actionTypes.WALLET_OK, payload});
      }
};


async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

export const updateNotification = payload => dispatch => {
    dispatch({type: actionTypes.CONTROLLER_UPDATE_NOTIFICATION, payload});
};