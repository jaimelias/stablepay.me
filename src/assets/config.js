
export const networks = {
	bitcoin: {
		name: 'Bitcoin',
		longName: 'Bitcoin (BTC)',
		mainCoinCode: 'btc'
	},	
	ethereum: {
		name: 'Ethereum',
		longName: 'Ethereum (ERC-20)',
		chainId: 1,
		explorer: 'https://etherscan.io/token/',
		mainCoinCode: 'eth'
	},
	binanceSmartChain: {
		name: 'Binance Smart Chain',
		longName: 'Binance Smart Chain (BEP-20)',
		chainId: 56,
		explorer: 'https://bscscan.com/token/',
		mainCoinCode: 'bnb'
	},
	polygon: {
		name: 'Polygon',
		longName: 'Polygon (MATIC)',
		chainId: 137,
		explorer: 'https://polygonscan.com/token/',
		mainCoinCode: 'matic'
	}
};

export const coins = {
	btc: {
			name: 'Bitcoin',
			longName: 'Bitcoin (BTC)',
			decimals: 8,
			addresses: {
				bitcoin: true
		}
	},
	eth: {
			name: 'Ethereum',
			longName: 'Ethereum (ETH)',
			decimals: 18,
			addresses: {
				ethereum: true
		}
	},
	bnb: {
			name: 'Binance Coin',
			longName: 'Binance Coin (BNB)',
			decimals: 18,
			addresses: {
				binanceSmartChain: true
		}
	},
	matic: {
			name: 'Binance Coin',
			longName: 'Binance Coin (BNB)',
			decimals: 18,
			addresses: {
				polygon: true
		}
	},
	ustd: {
			name: 'Tether',
			longName: 'Tether (USTD)',
			decimals: 6,
			addresses: {
				binanceSmartChain: '0x55d398326f99059ff775485246999027b3197955',
				ethereum: '0xdac17f958d2ee523a2206206994597c13d831ec7',
				polygon: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'
		}
	},
	usdc: {
			name: 'USDC',
			longName: 'USD Coin (USDC)',
			decimals: 6,
			addresses: {
				binanceSmartChain: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
				ethereum: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
				polygon: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
		}
	},
	busd: {
			name: 'BUSD',
			longName: 'Binance USD (BUSD)',
			decimals: 18,
			addresses: {
				binanceSmartChain: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
				ethereum: '0x4Fabb145d64652a948d72533023f6E7A623C7C53'
		}
	}
};

