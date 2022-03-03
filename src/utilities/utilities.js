export const isValidAmountTyping = val => /^\d*(?:[.]\d*)?$/.test(val);
export const isInvalidAmountString = val => (isValidAmountTyping(val) && val !== '') ? (!val.endsWith('.')) ? (parseFloat(val) > 0) ?  false : true : true : true;
export const isValidSlug = val => /^[a-z0-9]+(?:.[a-z0-9]+)*$/.test(val);
export const abbreviateAddress = val => (val) ? (val.length > 12) ? `${val.slice(0,4)}...............${val.slice(-4)}` : '' : '';

export const round = ({val, precision}) => {
    val = parseFloat(val);
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(val * multiplier) / multiplier;
}

export const getRecipient = ({network, Wallet}) => {
    let recipient = {};

    const {data} = Wallet;

    if(data && network)
    {
        const {network: walletNetwork, data: walletData} = data;

        if(typeof walletNetwork === 'string' && typeof walletData === 'object')
        {
            if(walletData[network])
            {
                recipient = walletData[network];
            }
        }
    }

    return recipient;
};

export const filterCoins = ({Wallet, coins, network}) => filterCoinsByWallet({Wallet, coins: filterCoinsByNetwork({coins, network}), network});


export const filterCoinsByNetwork = ({coins, network}) => {
    let output = {}

    for(let c in coins)
    {
        if(coins[c].addresses[network])
        {
            output[c] = coins[c];
        }
    }

    return output;
};

export const filterCoinsByWallet = ({Wallet, coins, network}) => {
    const {data} = Wallet;
    let output = {};

    if(typeof data === 'object')
    {
        const {data: walletData} = data;

        if(typeof walletData === 'object')
        {
            for(let c in coins)
            {
                if(walletData[network])
                {
                    if(walletData[network].coins.includes(c))
                    {
                        output[c] = coins[c];
                    }
                }
            }            
        }
    }

    return output;
};

export const isUrl = str => {
	const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/igm;

	return (str) ? regex.test(str) : false;
}