
export const networks = {
	ethereum: {
		name: 'Ethereum',
		chainId: 1
	},
	binanceSmartChain: {
		name: 'Binance Smart Chain',
		chainId: 56
	},
	polygon: {
		name: 'Polygon',
		chainId: 137
	},
	solana: {
		name: 'Solana'
	}
};

export const stablecoins = {
	ustd: {
			name: 'Tether',
			longName: 'Tether (USTD)',
			decimals: 6,
			addresses: {
				binanceSmartChain: '0x55d398326f99059ff775485246999027b3197955',
				ethereum: '0xdac17f958d2ee523a2206206994597c13d831ec7',
				polygon: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
				solana: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
		}
	},
	usdc: {
			name: 'USDC',
			longName: 'USD Coin (USDC)',
			decimals: 6,
			addresses: {
				binanceSmartChain: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
				ethereum: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
				polygon: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
				solana: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
		}
	}
};

