import {round} from './utilities';

export const isParamNotInBlockList = async (val) => {

    return fetch('/json/usernameBlockList.json').then(response => {
        if(response.ok)
        {
            return response.json();
        }
        else
        {
            throw Error('/json/usernameBlockList.json not found');
        }
    }).then(json => {
        if(!json.includes(val))
        {
            return true;
        }
        else
        {
            return false;
        }
    }).catch(err => {
        console.log(err.message);
    });
};

export const isValidAmountTyping = val => /^\d*(?:[.]\d*)?$/.test(val);
export const isInvalidAmountString = val => (isValidAmountTyping(val) && val !== '') ? (!val.endsWith('.')) ? (parseFloat(val) > 0) ?  false : true : true : true;
export const isValidSlug = val => /^[a-z0-9]+(?:.[a-z0-9]+)*$/.test(val);

export const isUrl = str => {
	const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/igm;

	return (str) ? regex.test(str) : false;
};

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