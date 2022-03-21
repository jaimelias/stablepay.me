
export const networks = {
	ada: {
		name: 'Cardano (ADA)',
		explorer: 'https://cardanoscan.io/token/',
		networkMainAsset: 'ada'		
	},
	bsc: {
		name: 'Binance Smart Chain (BEP-20)',
		chainId: 56,
		explorer: 'https://bscscan.com/token/',
		networkMainAsset: 'bnb'
	},	
	btc: {
		name: 'Bitcoin (BTC)',
		networkMainAsset: 'btc'
	},	
	eth: {
		name: 'Ethereum (ERC-20)',
		chainId: 1,
		explorer: 'https://etherscan.io/token/',
		networkMainAsset: 'eth'
	},
	matic: {
		name: 'Polygon (MATIC)',
		chainId: 137,
		explorer: 'https://polygonscan.com/token/',
		networkMainAsset: 'matic'
	},
	sol: {
		name: 'Solana (SOL)',
		explorer: 'https://solscan.io/token/',
		networkMainAsset: 'sol'		
	}
};

export const assets = {
	ada: {
			name: 'Cardano (ADA)',
			decimals: 18,
			addresses: {
				ada: true
		}
	},
	bnb: {
			name: 'Binance Coin (BNB)',
			decimals: 18,
			addresses: {
				bsc: true
		}
	},
	btc: {
			name: 'Bitcoin (BTC)',
			decimals: 8,
			addresses: {
				btc: true
		}
	},
	matic: {
			name: 'Poligon (MATIC)',
			decimals: 18,
			addresses: {
				matic: true
		}
	},
	sol: {
			name: 'Solana (SOL)',
			decimals: 6,
			addresses: {
				sol: true
		}
	},
	eth: {
			name: 'Ethereum (ETH)',
			decimals: 18,
			addresses: {
				eth: true
		}
	},
	busd: {
			name: 'Binance USD (BUSD)',
			decimals: 18,
			addresses: {
				bsc: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
				eth: '0x4Fabb145d64652a948d72533023f6E7A623C7C53'
		}
	},
	usdt: {
			name: 'Tether (USTD)',
			decimals: 6,
			addresses: {
				bsc: '0x55d398326f99059ff775485246999027b3197955',
				eth: '0xdac17f958d2ee523a2206206994597c13d831ec7',
				matic: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
				sol: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
		}
	},
	usdc: {
			name: 'USD Coin (USDC)',
			decimals: 6,
			addresses: {
				bsc: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
				eth: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
				matic: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
				sol: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
		}
	},
	xaut: {
		name: 'Tether Gold (XAUT)',
		decimals: 18,
		addresses: {
			eth: '0x68749665FF8D2d112Fa859AA293F07A622782F38'
		}
	},
	dai: {
		name: 'Multi-Collateral Dai  (DAI)',
		decimals: 6,
		addresses: {
			eth: '0x6b175474e89094c44da98b954eedeac495271d0f'
		}
	},
	ust: {
		name: 'TerraUSD (UST)',
		decimals: 18,
		addresses: {
			eth: '0x6b175474e89094c44da98b954eedeac495271d0f'
		}
	},
	wbtc: {
		name: 'Wrapped Bitcoin (WBTC)',
		decimals: 8,
		addresses: {
			eth: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
		}
	}
};

