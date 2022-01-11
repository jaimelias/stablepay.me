export const isValidAmountTyping = val => /^\d{0,4}(?:[.]\d{0,2})?$/.test(val);
export const isInvalidAmountString = val => (isValidAmountTyping(val) && val !== '') ? (!val.endsWith('.')) ? (parseFloat(val) > 0) ?  false : true : true : true;
export const isValidSlug = val => /^[a-z0-9]+(?:.[a-z0-9]+)*$/.test(val);
export const abbreviateAddress = val => (val) ? `${val.slice(0,6)}...${val.slice(-6)}` : '';