import React, {Component} from 'react';
import PaymentConfigComponent from './PaymentConfigComponent';
import PaymentConfirmationComponent from './PaymentConfirmComponent';
import  {isInvalidAmountString, round} from '../utilities/utilities';
import {StepsComponent} from './appElements';
import Box from '@mui/material/Box';
import * as actionTypes from '../redux/actionTypes';

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_COIN, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class Payment extends Component {

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

                dispatchInputChanges({
                    type: CONTROLLER_SELECT_NETWORK,
                    payload: {network, coins: availableCoins}
                });

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

        const {Wallet, Controllers, Config, dispatchInputChanges} = this.props;
        const {appScreen} = Controllers;
        const appScreenArr = appScreen.split('.');
        const appScreenNumber = parseFloat(appScreenArr[appScreenArr.length - 1]);
        
        return (
            <>

                <Box sx={{mb: 3}}>
                  <StepsComponent steps={['Payment', 'Checkout']} appScreen={appScreenNumber} />
                </Box>                

                {appScreen === 'app.payment.1' ? <>
                    <PaymentConfigComponent
                        dispatchInputChanges={dispatchInputChanges}
                        Controllers={Controllers}
                        Config={Config}
                    />
                </> : ''}

                {appScreen === 'app.payment.2' ?  <>
                  <PaymentConfirmationComponent
                    dispatchInputChanges={dispatchInputChanges}
                    Controllers={Controllers}
                    Wallet={Wallet}
                    Config={Config}
                  />
                </> : ''}

            </>
        );

    };
}