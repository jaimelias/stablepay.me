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

export const hexToRgb = hex => {
	

    hex = hex.substring(1, hex.length);
	let arr = hex.match(/.{1,2}/g);
	
	if(Array.isArray(arr))
	{
		if(arr.length === 3)
		{
			return [
				parseInt(arr[0], 16),
				parseInt(arr[1], 16),
				parseInt(arr[2], 16)
			];			
		}
	}
	
	return '';
};

export const shadeHexColor = ({color, percent}) => {

    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}