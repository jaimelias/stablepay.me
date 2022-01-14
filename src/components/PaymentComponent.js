import React, {Component} from 'react';
import  {isValidAmountTyping, isInvalidAmountString, round, getRecipient} from '../utilities/utilities';
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
import btcIcon from '../assets/svg/crypto/btc.svg';
import ethIcon from '../assets/svg/crypto/eth.svg';
import bnbIcon from '../assets/svg/crypto/bnb.svg';
import maticIcon from '../assets/svg/crypto/matic.svg';
import contractIcon from '../assets/svg/icons/contract.svg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import * as actionTypes from '../redux/actionTypes';
import  {abbreviateAddress} from '../utilities/utilities';
import {CopyListItem, StepsComponent} from './appElements';

const cryptoIcons = {ustdIcon, usdcIcon, busdIcon, btcIcon, ethIcon, bnbIcon, maticIcon};

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_COIN, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class Payment extends Component {

    constructor(props){
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNetworkSelect = this.handleNetworkSelect.bind(this);
        this.handleCoinSelect = this.handleCoinSelect.bind(this);
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

            //if there is only one coin in the network set is as default
            if(Object.keys(availableCoins).length === 1)
            {
                dispatchInputChanges({
                    type: CONTROLLER_SELECT_COIN,
                    payload: network || ''
                });   
            }

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

    handleCoinSelect(coin){
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

        if(coins[coin] && networks[network].explorer)
        {
            const explorerUrl = networks[network].explorer + coins[coin].addresses[network];

            window.open(explorerUrl, "_blank")
        }
    }

    handleOpenWalletConfirm()
    {
        const {Controllers, dispatchInputChanges} = this.props;
        let {amount, coins, coin} = Controllers;
        const decimals = coins[coin].decimals;

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

    handleGoBack(){

        const {dispatchInputChanges} = this.props;

        dispatchInputChanges({
            type: CONTROLLER_CHANGE_APP_SCREEN,
            payload: 'app.payment.1'
        });            
    }

    componentDidMount(){

        const {amountPath, networkPath, coinPath, dispatchInputChanges, Config} = this.props;
        const {networks, coins} = Config;

        let network = '';
        let coin = '';
        let amount = '';

        if(networkPath)
        {
            for(let n in networks)
            {
                if(n === networkPath)
                {
                    network = n;
                }
            }

            if(network)
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


                if(coins.hasOwnProperty(coinPath))
                {
                    coin = coinPath;

                    if(!isInvalidAmountString(amountPath))
                    {
                        amount = amountPath
                    }
                }
                else if(!coinPath && !isInvalidAmountString(amountPath))
                {
                    amount = amountPath;

                    if(coins.hasOwnProperty(networkPath))
                    {
                        coin = networkPath;
                    }
                }

                if(network && coin && amount)
                {
                    if(coins.hasOwnProperty(coin))
                    {
                        if(coins[coin].addresses.hasOwnProperty(network))
                        {
                            const decimals = coins[coin].decimals;
                            amount = round({val: amount, precision: decimals});

                            dispatchInputChanges({
                                type: CONTROLLER_SELECT_NETWORK,
                                payload: {network, coins: availableCoins}
                            });
                            
                            dispatchInputChanges({
                                type: CONTROLLER_SELECT_COIN,
                                payload: coin || ''
                            });
                            
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
                }
            }            
        }
    }

    render(){

        const {Wallet, Controllers, Config} = this.props;
        const {amount, network, coin, coins, appScreen} = Controllers;
        const {networks} = Config;
        const isInvalidAmount = (coin && network) ? isInvalidAmountString(amount) : true;
        const recipientWallet = (Wallet.status === 'ok') ? getRecipient({network, Wallet}) : {};
        const {address: recipientWalletAddress, memo: recipientWalletMemo} = recipientWallet || '';
        let availableCoins = Object.keys(coins);

        const appScreenArr = appScreen.split('.');
        const appScreenNumber = parseFloat(appScreenArr[appScreenArr.length - 1]);
        
        let explorerBtnAttr = false;
        let explorerOnClick = () => true;

        if(coin && network)
        {
            if(coins[coin].addresses[network] !== true)
            {
                explorerBtnAttr = true;
                explorerOnClick = () => this.handleOpenExplorer({coin, network});
            }
        }

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
                            onChange={event => this.handleCoinSelect(event.target.value)}
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
                        <Divider variant="inset" component="li" />
                        <ListItem button={explorerBtnAttr} onClick={() => explorerOnClick()}>
                            <ListItemAvatar>
                                <img src={cryptoIcons[`${coin}Icon`]} alt={coin}  width="40" height="40"/>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="h5">{amount}</Typography>} secondary={coins[coin].name} />
                        </ListItem>  
                        
                        <Divider variant="inset" component="li" />

                        <ListItem>
                            <ListItemAvatar>
                                <img src={cryptoIcons[`${network}Icon`]} alt={network}  width="40" height="40" />
                            </ListItemAvatar>
                            <ListItemText primary={networks[network].name} secondary={'Network'} />
                        </ListItem>

                        <Divider variant="inset" component="li" />

                        <CopyListItem 
                            copyThis={recipientWalletAddress}
                            labelSanitizer={abbreviateAddress}
                            label={'Recipient Address'}
                            message={'Recipient address copied to clipboard!'}
                            image={contractIcon}
                            />

                        {recipientWalletMemo ? <>
                            <Divider variant="inset" component="li" />

                            <CopyListItem 
                                copyThis={recipientWalletMemo}
                                label={'Memo'}
                                message={'Memo copied to clipboard!'}
                                image={contractIcon}
                                />                        
                        </> : ''}
                       
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

                {appScreen === 'app.payment.1' ? <>
                    <RenderPaymentConfigComponent />
                </> : ''}

                {appScreen === 'app.payment.2' ?  <>
                  <RenderPaymentConfirmationComponent />
                </> : ''}

            </>
        );

    };
}