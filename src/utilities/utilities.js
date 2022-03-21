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

export const filterAssets = ({Wallet, assets, network}) => filterAssetsByWallet({Wallet, assets: filterAssetsByNetwork({assets, network}), network});


export const filterAssetsByNetwork = ({assets, network}) => {
    let output = {}

    for(let c in assets)
    {
        if(assets[c].addresses[network])
        {
            output[c] = assets[c];
        }
    }

    return output;
};

export const filterAssetsByWallet = ({Wallet, assets, network}) => {
    const {data} = Wallet;
    let output = {};

    if(typeof data === 'object')
    {
        const {data: walletData} = data;

        if(typeof walletData === 'object')
        {
            for(let c in assets)
            {
                if(walletData[network])
                {
                    if(walletData[network].assets.includes(c))
                    {
                        output[c] = assets[c];
                    }
                }
            }            
        }
    }

    return output;
};