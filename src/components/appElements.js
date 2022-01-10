import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import  * as actionTypes from '../redux/actionTypes';
import  {isValidAmountTyping, isInvalidAmountString} from '../utilities/utilities';
import  {stableCoins} from '../assets/config';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';



export const EnterAmountForm = ({Controllers, slugAmount}) => {


    //convertir a CLASS y utilizar el slugAmount para alterar el campo payment-amount con el valor

    const dispatch = useDispatch();
    let {amount} = Controllers;

    const handleAmountChange = () => event => {
        const amount = event.target.value;

        if(isValidAmountTyping(amount))
        {
            dispatch({type: actionTypes.CONTROLLER_CHANGE_AMOUNT, payload: amount});
        }
    };

    const invalidAmountString = isInvalidAmountString(amount);

    return (
        <>
            <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="payment-amount">Amount</InputLabel>
                <FilledInput
                    id="payment-amount"
                    value={amount}
                    onChange={handleAmountChange()}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            </FormControl>
            
            <Button disabled={invalidAmountString} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>{'Choose Network'}</Button>
        </>
    );
};

export const DisplayStableLogos = () => {

    return (
        <Box sx={{mt: 2, alignItems: 'center'}}>
            {
                Object.keys(stableCoins)
                    .map((v, i) => ( <img key={i} alt={v} src={`/assets/crypto/${v}.svg`} width="40" height="40" />))
            }
        </Box>
    );
};