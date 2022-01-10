import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import  * as actionTypes from '../redux/actionTypes';
import  {isValidAmount} from '../utilities/utilities';
import  {stableCoins} from '../assets/config';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';


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

export const DisplayStableLogos = () => {


    return (
        <Box sx={{marginTop: 4, alignItems: 'center'}}>
            <Typography mt={2} mb={1}>Stablepay</Typography>
            <>
                {
                    Object.keys(stableCoins)
                        .map((v, i) => ( <img key={i} alt={v} src={`/assets/crypto/${v}.svg`} width="40" height="40" />))
                }
            </>
        </Box>
    );
};