import React, {Component}  from 'react';
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
import { Link } from 'react-router-dom';
import  {isInvalidAmountString, isValidAmountTyping, round, filterCoins} from '../../utilities/utilities';
import * as actionTypes from '../../redux/actionTypes';
import { cryptoIcons, appIcons } from '../../assets/svgIcons';


const {dollarIcon} = appIcons;

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_COIN, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;


export default class PaymentConfigComponent extends Component {
    constructor(props){
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNetworkSelect = this.handleNetworkSelect.bind(this);
        this.handleCoinSelect = this.handleCoinSelect.bind(this);
        this.handleOpenWalletConfirm = this.handleOpenWalletConfirm.bind(this);
    }

    handleAmountChange(amount){

        const {dispatchInputChanges} = this.props;

        if(isValidAmountTyping(amount))
        {
            //validats the amount while typing
            
            dispatchInputChanges({
                type: CONTROLLER_CHANGE_AMOUNT,
                payload: amount || ''
            });
        }
    };

    handleNetworkSelect(network){
        const {dispatchInputChanges, Config, Controllers, Wallet} = this.props;
        let {asset} = Controllers;
        const {networks, coins} = Config;

        if(networks.hasOwnProperty(network))
        {

            let availableCoins = filterCoins({Wallet, coins, network});

            //sets the network and coins
            dispatchInputChanges({
                type: CONTROLLER_SELECT_NETWORK,
                payload: {network, coins: availableCoins}
            });

             // unsets asset if not available in network
            if(!availableCoins.hasOwnProperty(asset))
            {
                dispatchInputChanges({
                    type: CONTROLLER_SELECT_COIN,
                    payload: ''
                });

                
                //if there is only one asset in the network set is as default
                if(availableCoins.hasOwnProperty(network))
                {
                    dispatchInputChanges({
                        type: CONTROLLER_SELECT_COIN,
                        payload: network || ''
                    }); 
                }                
            }
        }
    }

    handleCoinSelect(asset){
        const {dispatchInputChanges, Controllers} = this.props;
        const {coins} = Controllers;
        if(coins.hasOwnProperty(asset) || asset === '')
        {
            dispatchInputChanges({
                type: CONTROLLER_SELECT_COIN,
                payload: asset || ''
            });   
        }
    };    

    handleOpenWalletConfirm()
    {
        const {Controllers, dispatchInputChanges} = this.props;
        let {amount, coins, asset} = Controllers;
        const decimals = coins[asset].decimals;

        if(isValidAmountTyping(amount))
        {
            amount = round({val: amount, precision: decimals});

            dispatchInputChanges({
                type: CONTROLLER_CHANGE_AMOUNT,
                payload: amount.toString() || ''
            });

            dispatchInputChanges({
                type: CONTROLLER_CHANGE_APP_SCREEN,
                payload: 'app.payment.2'
            });         
        }        
    }

    render(){

        const {Controllers, Config, Wallet} = this.props;
        const {networks} = Config;
        const {amount, network, asset, coins} = Controllers;
        const isInvalidAmount = (asset && network) ? isInvalidAmountString(amount) : true;
        let availableCoins = Object.keys(coins);

        let cofirmArr = [Wallet.data.name];

        if(network)
        {
            cofirmArr.push(network);

            if(network !== asset)
            {
                cofirmArr.push(asset);
            }

            if(!isInvalidAmount)
            {
                cofirmArr.push(amount);
            }
        }

        const cofirmPath = cofirmArr.join('/');

        return (
            <>
                <FormControl fullWidth variant="filled" sx={{mb: 3}}>
                    <InputLabel id="network-label">{'Network'}</InputLabel>
                    <Select
                        labelId="network-label"
                        id="network"
                        value={network}
                        label={'Network'}
                        onChange={event => this.handleNetworkSelect(event.target.value)}
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
                            aria-label="asset"
                            name="asset"
                            onChange={event => this.handleCoinSelect(event.target.value)}
                            value={asset}
                            >
                            {
                            
                            availableCoins
                                .map(v => <FormControlLabel key={v} value={v} control={<Radio />} label={coins[v].name} />)
                            }
                        </RadioGroup>
                    </FormControl>                
                </> : ''}
        
        
                <AmountField 
                    network={network}
                    asset={asset}
                    amount={amount}
                    handleAmountChange={this.handleAmountChange}
                />
                
                <Button
                    disabled={!network || !asset || isInvalidAmount}
                    sx={{mb: 3}} 
                    type="button" 
                    fullWidth
                    size="small"
                    component={network && asset && !isInvalidAmount ? Link : 'button'}
                    to={network && asset && !isInvalidAmount ? `/${cofirmPath}` : ''}
                    variant='contained'>{'Next'}</Button>
            </>
        )
    };
};

const AmountField = ({network, asset, amount, handleAmountChange}) => (                
    <TextField
        disabled={!asset || !network}
        sx={{mb: 3}}
        fullWidth
        id="amount"
        label={'Amount'}
        onChange={event => handleAmountChange(event.target.value)}
        value={amount || ''}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <img alt="paymentIcon" src={(!asset) ? dollarIcon : cryptoIcons[`${asset}Icon`]} width="20" height="20" />
                </InputAdornment>
            )
        }}
        variant="filled"
    />
);