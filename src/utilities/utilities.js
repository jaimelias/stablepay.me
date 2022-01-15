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
        const {walletNetwork, walletData} = data;

        if(typeof walletNetwork === 'string' && typeof walletData === 'object')
        {
            if(Wallet.data.walletData.hasOwnProperty(network))
            {
                recipient = Wallet.data.walletData[network];
            }
        }
    }

    return recipient;
};