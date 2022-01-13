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
import Typography from '@mui/material/Typography';
import dollarIcon from '../assets/svg/icons/dollar.svg';
import ustdIcon from '../assets/svg/crypto/ustd.svg';
import usdcIcon from '../assets/svg/crypto/usdc.svg';
import busdIcon from '../assets/svg/crypto/busd.svg';
import binanceSmartChainIcon from '../assets/svg/crypto/binanceSmartChain.svg';
import ethereumIcon from '../assets/svg/crypto/ethereum.svg';
import polygonIcon from '../assets/svg/crypto/polygon.svg';
import btcIcon from '../assets/svg/crypto/btc.svg';
import ethIcon from '../assets/svg/crypto/eth.svg';
import bnbIcon from '../assets/svg/crypto/bnb.svg';
import maticIcon from '../assets/svg/crypto/matic.svg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import * as actionTypes from '../redux/actionTypes';
import {RecipientAddressListItem, StepsComponent} from './appElements';

const cryptoIcons = {ustdIcon, usdcIcon, busdIcon, binanceSmartChainIcon, ethereumIcon, polygonIcon, btcIcon, ethIcon, bnbIcon, maticIcon};

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_COIN, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class PaymentForm extends Component {

    constructor(props){
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNetworkSelect = this.handleNetworkSelect.bind(this);
        this.handleStablecoinSelect = this.handleStablecoinSelect.bind(this);
        this.handleOpenExplorer = this.handleOpenExplorer.bind(this);
        this.handleOpenWalletConfirm = this.handleOpenWalletConfirm.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    };

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
        const {dispatchInputChanges, Config, Controllers} = this.props;
        let {coin} = Controllers;
        const {networks, coins} = Config;

        if(networks.hasOwnProperty(network))
        {

            let availableCoins = {};

            for(let c in coins)
            {
                //sets only available coins
                if(coins[c].addresses[network])
                {
                    availableCoins[c] = coins[c];
                }
            }

            //sets the network and coins
            dispatchInputChanges({
                type: CONTROLLER_SELECT_NETWORK,
                payload: {network, coins: availableCoins}
            });

            // unsets coin if not available in network
            if(coins.hasOwnProperty(coin))
            {
                if(!coins[coin].addresses[network])
                {
                    dispatchInputChanges({
                        type: CONTROLLER_SELECT_COIN,
                        payload: ''
                    });
                }
            }
        }
    }

    handleStablecoinSelect(coin){
        const {dispatchInputChanges, Controllers} = this.props;
        const {coins} = Controllers;
        if(coins.hasOwnProperty(coin) || coin === '')
        {
            dispatchInputChanges({
                type: CONTROLLER_SELECT_COIN,
                payload: coin || ''
            });   
        }
    };

    handleOpenExplorer({coin, network}){
        const {Config, Controllers} = this.props;
        const {coins} = Controllers
        const {networks} = Config;

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
                payload: 'app.payment.2'
            });         
        }        
    }

    handleGoBack(){

        const {dispatchInputChanges} = this.props;

        dispatchInputChanges({
            type: CONTROLLER_CHANGE_APP_SCREEN,
            payload: 'app.payment.1'
        });            
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
        const {amount, network, coin, coins, appScreen} = Controllers;
        const {networks} = Config;
        const invalidPathAmount = isInvalidAmountString(pathAmount);
        const isInvalidAmount = isInvalidAmountString(amount);
        const walletAddress = (Wallet.data.hasOwnProperty('address')) ? Wallet.data.address : '';
        let availableCoins = Object.keys(coins);

        const appScreenArr = appScreen.split('.');
        const appScreenNumber = parseFloat(appScreenArr[appScreenArr.length - 1]);        

        const RenderPaymentConfigComponent = () => (
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
                        Object.keys(networks).map(v => <MenuItem value={v} key={v}>{networks[v].longName}</MenuItem>)
                    }

                    </Select>
                </FormControl>

                <FormControl component="fieldset" fullWidth sx={{mb: 3}}>
                    <FormLabel component="legend">{'Coins'}</FormLabel>
                    <RadioGroup
                        disabled={!network}
                        aria-label="coin"
                        name="coin"
                        onChange={event => this.handleStablecoinSelect(event.target.value)}
                        value={coin}
                        >
                        {
                           
                           availableCoins
                            .map(v => <FormControlLabel key={v} value={v} control={<Radio />} label={coins[v].longName} />)
                        }
                    </RadioGroup>
                </FormControl>

                <TextField
                    disabled={!coin || !network}
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
                    onClick={() => this.handleOpenWalletConfirm()}
                    variant="contained">{'Next'}</Button>

                
            </>
        );

        const RenderPaymentConfirmationComponent = () => {

            return (
                <>
                    <List
                        component="nav"
                        sx={{
                        mb: 3,
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        }}
                    >

                        <ListItem>
                            <ListItemAvatar>
                                <img src={dollarIcon} alt="amount" width="40" height="40" />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="h5">{amount}</Typography>} secondary={'Amount'} />
                        </ListItem> 
                        <Divider variant="inset" component="li" />                      
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
                            <ListItemText primary={coins[coin].longName} secondary={'Contract'} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <RecipientAddressListItem 
                            walletAddress={walletAddress}
                            recipientAddressLabel={'Recipient Address'}
                            successMessage={'Recipient address copied to clipboard!'}
                            />
                       
                    </List>
                    <Button onClick={() => this.handleGoBack()}><Typography variant="h5">&#8592;</Typography></Button>
                </>
            );
        };

        return (
            <>

                <Box sx={{mb: 3}}>
                  <StepsComponent steps={['Payment', 'Checkout']} appScreen={appScreenNumber} />
                </Box>                

                {appScreen === 'app.payment.1'? <>
                    <RenderPaymentConfigComponent />
                </> : ''}

                {appScreen === 'app.payment.2' && network && coin && !isInvalidAmount ?  <>
                  <RenderPaymentConfirmationComponent />
                </> : ''}

            </>
        );

    };
}