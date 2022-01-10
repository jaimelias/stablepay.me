export const isValidAmountTyping = val => /^\d{0,4}(?:[.]\d{0,2})?$/.test(val);
export const isInvalidAmountString = val => (isValidAmountTyping(val) && val !== '') ? (!val.endsWith('.')) ?  false : true : true;
export const isValidSlug = val => /^[a-z0-9]+(?:.[a-z0-9]+)*$/.test(val);