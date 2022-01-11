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
import dollarIcon from '../assets/svg/icons/dollar.svg';
import ustdIcon from '../assets/svg/crypto/ustd.svg';
import usdcIcon from '../assets/svg/crypto/usdc.svg';
import busdIcon from '../assets/svg/crypto/busd.svg';
import binanceSmartChainIcon from '../assets/svg/crypto/binanceSmartChain.svg';
import ethereumIcon from '../assets/svg/crypto/ethereum.svg';
import polygonIcon from '../assets/svg/crypto/polygon.svg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import * as actionTypes from '../redux/actionTypes';
import {RecipientAddressListItem} from './appElements';

const cryptoIcons = {ustdIcon, usdcIcon, busdIcon, binanceSmartChainIcon, ethereumIcon, polygonIcon};

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_COIN, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class PaymentForm extends Component {

    constructor(props){
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNetworkSelect = this.handleNetworkSelect.bind(this);
        this.handleStablecoinSelect = this.handleStablecoinSelect.bind(this);
        this.handleOpenExplorer = this.handleOpenExplorer.bind(this);
        this.handleOpenWalletConfirm = this.handleOpenWalletConfirm.bind(this);
    };

    handleAmountChange(amount){

        const {dispatchInputChanges} = this.props;

        if(isValidAmountTyping(amount))
        {
            dispatchInputChanges({
                type: CONTROLLER_CHANGE_AMOUNT,
                payload: amount || ''
            });
        }
    };

    handleNetworkSelect(network){
        const {dispatchInputChanges, Config} = this.props;
        const {networks} = Config;

        if(networks.hasOwnProperty(network) || network === '')
        {
            dispatchInputChanges({
                type: CONTROLLER_SELECT_NETWORK,
                payload: network || ''
            });   
        }
    }

    handleStablecoinSelect(coin){
        const {dispatchInputChanges, Config} = this.props;
        const {coins} = Config;
        if(coins.hasOwnProperty(coin) || coin === '')
        {
            dispatchInputChanges({
                type: CONTROLLER_SELECT_COIN,
                payload: coin || ''
            });   
        }
    };

    handleOpenExplorer({coin, network}){
        const {Config} = this.props;
        const {coins, networks} = Config;

        if(coins.hasOwnProperty(coin))
        {
            const explorerUrl = networks[network].explorer + coins[coin].addresses[network];

            window.open(explorerUrl, "_blank")
        }
    }

    handleOpenWalletConfirm()
    {
        const {Controllers, dispatchInputChanges} = this.props;
        const {amount} = Controllers;

        if(isValidAmountTyping(amount))
        {
            dispatchInputChanges({
                type: CONTROLLER_CHANGE_AMOUNT,
                payload: parseFloat(amount).toFixed(2).toString() || ''
            });

            dispatchInputChanges({
                type: CONTROLLER_CHANGE_APP_SCREEN,
                payload: 'paymentConfirmation'
            });         
        }        
    }

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

        const {Wallet, Controllers, Config, pathAmount} = this.props;
        const {amount, network, coin, appScreen} = Controllers;
        const {networks, coins} = Config;
        const invalidPathAmount = isInvalidAmountString(pathAmount);
        const invalidAmount = isInvalidAmountString(amount);
        const invalidNetwork = !networks.hasOwnProperty(network);
        const invalidStablecoin = !coins.hasOwnProperty(coin);
        const walletAddress = (Wallet.data.hasOwnProperty('address')) ? Wallet.data.address : '';
        let availableCoins = Object.keys(coins);

        if(network)
        {
            availableCoins = availableCoins
                .filter(v => coins[v].addresses.hasOwnProperty(network) ? coins[v].addresses[network] ? true : false : false);
        }

        const RenderPaymentConfigComponent = () => (
            <>
                <TextField
                    autoFocus={invalidPathAmount}
                    sx={{mb: 3}}
                    fullWidth
                    id="amount"
                    label={'Amount'}
                    onChange={event => this.handleAmountChange(event.target.value)}
                    value={amount || ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img alt="dollarIcon" src={dollarIcon} width="20" height="20" />
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
                        onChange={event => this.handleNetworkSelect(event.target.value)}
                        disabled={invalidAmount}
                        >
                    {
                        Object.keys(networks).map(v => <MenuItem value={v} key={v}>{networks[v].longName}</MenuItem>)
                    }

                    </Select>
                </FormControl>


                <FormControl component="fieldset" fullWidth sx={{mb: 3}}>
                    <FormLabel component="legend">{'Coin'}</FormLabel>
                    <RadioGroup
                        aria-label="coin"
                        name="coin"
                        onChange={event => this.handleStablecoinSelect(event.target.value)}
                        value={coin}
                        >
                        {
                           
                           availableCoins
                            .map(v => <FormControlLabel key={v} value={v} disabled={invalidNetwork || invalidAmount} control={<Radio />} label={coins[v].longName} />)
                        }
                    </RadioGroup>
                </FormControl>
                
                <Button 
                    disabled={invalidAmount || invalidNetwork || invalidStablecoin} 
                    sx={{mb: 3}} 
                    type="button" 
                    fullWidth
                    onClick={() => this.handleOpenWalletConfirm()}
                    variant="contained">{'Next'}</Button>

                
            </>
        );

        const RenderPaymentConfirmationComponent = () => {

            return (
                <List
                component="nav"
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                     <img src={cryptoIcons[`${network}Icon`]} alt={network}  width="40" height="40" />
                  </ListItemAvatar>
                  <ListItemText primary={networks[network].longName} secondary={'Network'} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button onClick={()=> this.handleOpenExplorer({coin, network})}>
                  <ListItemAvatar>
                    <img src={cryptoIcons[`${coin}Icon`]} alt={coin}  width="40" height="40"/>
                  </ListItemAvatar>
                  <ListItemText primary={coins[coin].longName} secondary={'Token Contract'} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <RecipientAddressListItem 
                    walletAddress={walletAddress}
                    recipientAddressLabel={'Recipient Address'}
                    successMessage={'Recipient address copied to clipboard!'}
                    />
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                      <img src={dollarIcon} alt="amount" width="40" height="40" />
                  </ListItemAvatar>
                  <ListItemText primary={amount} secondary={'Amount'} />
                </ListItem>
              </List>
            );
        };

        return (
            <>

                {appScreen === 'paymentConfiguration'? <>
                    <RenderPaymentConfigComponent />
                </> : ''}

                {appScreen === 'paymentConfirmation' && !invalidAmount && !invalidNetwork && !invalidStablecoin ?  <>
                  <RenderPaymentConfirmationComponent />
                </> : ''}
            </>
        );

    };
}