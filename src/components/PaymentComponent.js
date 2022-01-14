import React, {Component} from 'react';
import { PaymentConfigComponent } from './PaymentConfigComponent';
import  {isValidAmountTyping, isInvalidAmountString, round, getRecipient} from '../utilities/utilities';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import * as actionTypes from '../redux/actionTypes';
import  {abbreviateAddress} from '../utilities/utilities';
import {CopyListItem, StepsComponent} from './appElements';
import { cryptoIcons, appIcons } from '../assets/svgIcons';

const {contractIcon} = appIcons;

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
        const recipientWallet = (Wallet.status === 'ok') ? getRecipient({network, Wallet}) : {};
        const {address: recipientWalletAddress, memo: recipientWalletMemo} = recipientWallet || '';

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



        const PaymentConfirmationComponent = () => {

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
                    <PaymentConfigComponent
                        network={network}
                        coin={coin}
                        amount={amount}
                        networks={networks}
                        coins={coins}
                        handleNetworkSelect={this.handleNetworkSelect}
                        handleCoinSelect={this.handleCoinSelect}
                        handleAmountChange={this.handleAmountChange}
                        handleOpenWalletConfirm={this.handleOpenWalletConfirm}
                    />
                </> : ''}

                {appScreen === 'app.payment.2' ?  <>
                  <PaymentConfirmationComponent />
                </> : ''}

            </>
        );

    };
}