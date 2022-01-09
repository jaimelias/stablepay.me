import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import  * as actionTypes from '../redux/actionTypes';
import  {isValidAmount} from '../utilities/utilities';

import { useDispatch } from 'react-redux'

export const EnterAmountInput = ({Controllers}) => {

    const dispatch = useDispatch();
    const {amount} = Controllers;

    const handleAmountChange = () => event => {
        const amount = event.target.value;

        if(isValidAmount(amount))
        {
            dispatch({type: actionTypes.CONTROLLER_CHANGE_AMOUNT, payload: amount});
        }
    };
    
    return (
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="payment-amount">Amount</InputLabel>
            <FilledInput
                id="payment-amount"
                value={amount}
                onChange={handleAmountChange()}
                startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>
    );

};