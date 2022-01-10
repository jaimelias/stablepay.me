import React, {Component} from 'react';
import  {isValidAmountTyping, isInvalidAmountString} from '../utilities/utilities';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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

        const {Controllers, Config} = this.props;
        const {amount, network} = Controllers;
        const {networks, stablecoins} = Config;
        const invalidAmount = isInvalidAmountString(amount);
        const invalidNetwork = !networks.hasOwnProperty(network);

        return (
            <>
                <FormControl fullWidth variant="filled" sx={{mb: 3}}>
                    <InputLabel htmlFor="amount">{'Amount'}</InputLabel>
                    <FilledInput
                        id="amount"
                        value={amount || ''}
                        onChange={event => this.handleAmountChange(event)}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                </FormControl>

                <FormControl fullWidth variant="filled" sx={{mb: 3}}>
                    <InputLabel id="network-label">{'Network'}</InputLabel>
                    <Select
                        labelId="network-label"
                        id="network"
                        value={network}
                        label={'Network'}
                        onChange={event => this.handleNetworkSelect(event)}
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
                        >
                        {
                            Object.keys(stablecoins).map(v => <FormControlLabel key={v} value={v} control={<Radio />} label={stablecoins[v].longName} />)
                        }
                    </RadioGroup>
                </FormControl>
                
                <Button disabled={invalidAmount || invalidNetwork} type="submit" fullWidth variant="contained" sx={{mb: 2 }}>{'Choose Network'}</Button>
            </>
        );

    };
}