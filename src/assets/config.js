
export const networks = {
	btc: {
		name: 'Bitcoin (BTC)',
		mainCoin: 'btc'
	},	
	eth: {
		name: 'Ethereum (ERC-20)',
		chainId: 1,
		explorer: 'https://etherscan.io/token/',
		mainCoin: 'eth'
	},
	bnb: {
		name: 'Binance Smart Chain (BEP-20)',
		chainId: 56,
		explorer: 'https://bscscan.com/token/',
		mainCoin: 'bnb'
	},
	matic: {
		name: 'Polygon (MATIC)',
		chainId: 137,
		explorer: 'https://polygonscan.com/token/',
		mainCoin: 'matic'
	}
};

export const coins = {
	btc: {
			name: 'Bitcoin (BTC)',
			decimals: 8,
			addresses: {
				btc: true
		}
	},
	eth: {
			name: 'Ethereum (ETH)',
			decimals: 18,
			addresses: {
				eth: true
		}
	},
	bnb: {
			name: 'Binance Coin (BNB)',
			decimals: 18,
			addresses: {
				bnb: true
		}
	},
	matic: {
			name: 'Poligon (MATIC)',
			decimals: 18,
			addresses: {
				matic: true
		}
	},
	usdt: {
			name: 'Tether (USTD)',
			decimals: 6,
			addresses: {
				bnb: '0x55d398326f99059ff775485246999027b3197955',
				eth: '0xdac17f958d2ee523a2206206994597c13d831ec7',
				matic: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'
		}
	},
	usdc: {
			name: 'USD Coin (USDC)',
			decimals: 6,
			addresses: {
				bnb: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
				eth: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
				matic: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
		}
	},
	busd: {
			name: 'Binance USD (BUSD)',
			decimals: 18,
			addresses: {
				bnb: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
				eth: '0x4Fabb145d64652a948d72533023f6E7A623C7C53'
		}
	}
};

