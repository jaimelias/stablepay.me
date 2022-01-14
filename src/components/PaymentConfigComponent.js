import React  from 'react';
import  {isInvalidAmountString} from '../utilities/utilities';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { cryptoIcons, appIcons } from '../assets/svgIcons';

const {dollarIcon} = appIcons;

export const PaymentConfigComponent = ({network, coin, amount, networks, coins, handleNetworkSelect, handleCoinSelect, handleAmountChange, handleOpenWalletConfirm}) => {


    const isInvalidAmount = (coin && network) ? isInvalidAmountString(amount) : true;
    let availableCoins = Object.keys(coins);

    return (
        <>
            <FormControl fullWidth variant="filled" sx={{mb: 3}}>
                <InputLabel id="network-label">{'Network'}</InputLabel>
                <Select
                    labelId="network-label"
                    id="network"
                    value={network}
                    label={'Network'}
                    onChange={event => handleNetworkSelect(event.target.value)}
                    >
                {
                    Object.keys(networks).map(v => <MenuItem value={v} key={v}>{networks[v].name}</MenuItem>)
                }
    
                </Select>
            </FormControl>
    
    
            {(Object.keys(coins).length > 1) ? <>
                <FormControl component="fieldset" fullWidth sx={{mb: 3}}>
                    <FormLabel component="legend">{'Coins'}</FormLabel>
                    <RadioGroup
                        disabled={!network}
                        aria-label="coin"
                        name="coin"
                        onChange={event => handleCoinSelect(event.target.value)}
                        value={coin}
                        >
                        {
                        
                        availableCoins
                            .map(v => <FormControlLabel key={v} value={v} control={<Radio />} label={coins[v].name} />)
                        }
                    </RadioGroup>
                </FormControl>                
            </> : ''}
    
    
            <TextField
                disabled={!coin || !network}
                sx={{mb: 3}}
                fullWidth
                id="amount"
                label={'Amount'}
                onChange={event => handleAmountChange(event.target.value)}
                value={amount || ''}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img alt="paymentIcon" src={(!coin) ? dollarIcon : cryptoIcons[`${coin}Icon`]} width="20" height="20" />
                        </InputAdornment>
                    )
                }}
                variant="filled"
            />
            
            <Button
                disabled={!network || !coin || isInvalidAmount}
                sx={{mb: 3}} 
                type="button" 
                fullWidth
                onClick={() => handleOpenWalletConfirm()}
                variant="contained">{'Next'}</Button>
    
            
        </>
    )
};