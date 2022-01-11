import React, {Component} from 'react';
import  {isValidAmountTyping, isInvalidAmountString} from '../utilities/utilities';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Dollar from '../assets/svg/icons/dollar.svg';
import * as actionTypes from '../redux/actionTypes';

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_STABLECOIN} = actionTypes;

export default class PaymentForm extends Component {

    constructor(props){
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNetworkSelect = this.handleNetworkSelect.bind(this);
        this.handleStablecoinSelect = this.handleStablecoinSelect.bind(this);
    };

    handleAmountChange(event){
        const {dispatchInputChanges} = this.props;
        const amount = event.target.value;

        if(isValidAmountTyping(amount))
        {
            dispatchInputChanges({
                type: CONTROLLER_CHANGE_AMOUNT,
                payload: amount || ''
            });
        }
    };

    handleNetworkSelect(event){
        const {dispatchInputChanges, Config} = this.props;
        const {networks} = Config;
        const network =  event.target.value;

        if(networks.hasOwnProperty(network) || network === '')
        {
            dispatchInputChanges({
                type: CONTROLLER_SELECT_NETWORK,
                payload: network || ''
            });   
        }
    }

    handleStablecoinSelect(event){
        const {dispatchInputChanges, Config} = this.props;
        const {stablecoins} = Config;
        const stablecoin =  event.target.value;
        if(stablecoins.hasOwnProperty(stablecoin) || stablecoin === '')
        {
            dispatchInputChanges({
                type: CONTROLLER_SELECT_STABLECOIN,
                payload: stablecoin || ''
            });   
        }
    };

    componentDidMount(){
        const {pathAmount, dispatchInputChanges} = this.props;
        const invalidAmountString = isInvalidAmountString(pathAmount);
        
        if(!invalidAmountString)
        {
            dispatchInputChanges({
                type: CONTROLLER_CHANGE_AMOUNT,
                payload: parseFloat(pathAmount).toFixed(2).toString() || ''
            });
        }
    }

    render(){

        const {Controllers, Config, pathAmount} = this.props;
        const {amount, network, stablecoin} = Controllers;
        const {networks, stablecoins} = Config;
        const invalidPathAmount = isInvalidAmountString(pathAmount);
        const invalidAmount = isInvalidAmountString(amount);
        const invalidNetwork = !networks.hasOwnProperty(network);
        const invalidStablecoin = !stablecoins.hasOwnProperty(stablecoin);

        console.log({invalidNetwork, stablecoin});

        return (
            <>

                <TextField
                    autoFocus={invalidPathAmount}
                    sx={{mb: 3}}
                    fullWidth
                    id="amount"
                    label={'Amount'}
                    onChange={event => this.handleAmountChange(event)}
                    value={amount || ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img alt="dollar" src={Dollar} width="20" height="20" />
                            </InputAdornment>
                        )
                    }}
                    variant="filled"
                />                

                <FormControl fullWidth variant="filled" sx={{mb: 3}}>
                    <InputLabel id="network-label">{'Network'}</InputLabel>
                    <Select
                        labelId="network-label"
                        id="network"
                        value={network}
                        label={'Network'}
                        onChange={event => this.handleNetworkSelect(event)}
                        disabled={invalidAmount}
                        >
                    {
                        Object.keys(networks).map(v => <MenuItem value={v} key={v}>{networks[v].name}</MenuItem>)
                    }

                    </Select>
                </FormControl>


                <FormControl component="fieldset" fullWidth sx={{mb: 3}}>
                    <FormLabel component="legend">Stablecoin</FormLabel>
                    <RadioGroup
                        aria-label="stablecoin"
                        name="stablecoin"
                        onChange={event => this.handleStablecoinSelect(event)}
                        value={stablecoin}
                        >
                        {
                            Object.keys(stablecoins).map(v => <FormControlLabel key={v} value={v} disabled={invalidNetwork || invalidAmount} control={<Radio />} label={stablecoins[v].longName} />)
                        }
                    </RadioGroup>
                </FormControl>
                
                <Button disabled={invalidAmount || invalidNetwork || invalidStablecoin} type="submit" fullWidth variant="contained">{'Proceed'}</Button>
            </>
        );

    };
}