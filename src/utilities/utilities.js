export const isValidAmount = val => /^\d*\.?\d*$/.test(val);

export const isValidSlug = val => /^[a-z0-9]+(?:.[a-z0-9]+)*$/.test(val);


export const copyToClipboard = thisID => {
  
    let copyText = document.getElementById(thisID);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
};
  