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

export const isUrl = str => {
	const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/igm;

	return (str) ? regex.test(str) : false;
}

export const validateAssetPath = ({assets, walletNameParam, networkParam, assetParam}) => {

    let output = '';

    if(walletNameParam && networkParam)
    {
      if(isValidSlug(assetParam))
      {
          if(assets.hasOwnProperty(assetParam))
          {
                if(assets[assetParam].addresses.hasOwnProperty(networkParam))
                {
                    output = assetParam;
                }
          }
      }
    }

    return output;
  };

  export const validateWalletParams = ({Config, Params}) => {

    const {networks, assets} = Config;

    let walletParamError = false;

    let {walletNameParam = '', networkParam = '', assetParam = '', amountParam = ''} = Params;

    const validwalletParam = (isValidSlug(walletNameParam)) ? walletNameParam : '';
    
    const validNetworkPath = (isValidSlug(networkParam)) 
        ? (networks.hasOwnProperty(networkParam)) 
        ? networkParam 
        : '' 
        : '';

    const validAssetPath = validateAssetPath({
        assets, 
        walletNameParam: validwalletParam, 
        networkParam: validNetworkPath, 
        assetParam: assetParam
    });

    const validAmountPath = (validwalletParam && validNetworkPath && validAssetPath && !isInvalidAmountString(amountParam)) 
        ? round({val: amountParam, precision: assets[validAssetPath].decimals}).toString() 
        : '';

    if(walletNameParam && !validwalletParam)
    {
        walletParamError = true;
    }
    if(networkParam && !validNetworkPath)
    {
        walletParamError = true;
    }
    if(assetParam && !validAssetPath)
    {
        walletParamError = true;
    }
    if(amountParam && !validAmountPath)
    {
        walletParamError = true;
    }

    return {
        walletNameParam: validwalletParam, 
        networkParam: validNetworkPath, 
        assetParam: validAssetPath, 
        amountParam: validAmountPath,
        walletParamError
    };
}; 