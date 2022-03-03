import React, {Component} from 'react';
import PaymentConfigComponent from './PaymentConfigComponent';
import PaymentConfirmationComponent from './PaymentConfirmComponent';
import  {filterCoins, isInvalidAmountString, round} from '../utilities/utilities';
import {StepsComponent} from './appElements';
import Box from '@mui/material/Box';
import * as actionTypes from '../redux/actionTypes';

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_COIN, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class Payment extends Component {

    componentDidMount(){

        const { dispatchInputChanges, Config, Wallet} = this.props;
        const {networks, coins} = Config;
		let {amountPath, networkPath, coinPath} = this.props;
        let network = '';
        let coin = '';
        let amount = '';
		
		amountPath = (amountPath) ? amountPath : '';
		networkPath = (networkPath) ? networkPath : '';
		coinPath = (coinPath) ? coinPath : '';

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
                let availableCoins = filterCoins({Wallet, network, coins});

                dispatchInputChanges({
                    type: CONTROLLER_SELECT_NETWORK,
                    payload: {network, coins: availableCoins}
                });

                if(coins.hasOwnProperty(coinPath))
                {
                    coin = coinPath;
                }
				
               if(!coinPath)
                {
                    if(coins.hasOwnProperty(networkPath))
                    {
                        coin = networkPath;
                    }
                }
				
				if(!isInvalidAmountString(amountPath))
				{
					amount = amountPath;
				}
				

                if(network && coin)
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
                            
							if(amount)
							{
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
    }

    render(){

        const {Wallet, Controllers, Config, dispatchInputChanges, updateNotification} = this.props;
        const {appScreen} = Controllers;
        const appScreenArr = appScreen.split('.');
        const appScreenNumber = parseFloat(appScreenArr[appScreenArr.length - 1]);

        return (
            <>

                <Box sx={{mb: 3}}>
                  <StepsComponent steps={['Payment', 'Checkout']} appScreen={appScreenNumber} />
                </Box>                

                <RenderAppScreen
                    appScreen={appScreen}
                    dispatchInputChanges={dispatchInputChanges}
                    Controllers={Controllers}
                    Wallet={Wallet}
                    Config={Config}
                    updateNotification={updateNotification}                
                />

            </>
        );

    };
};

const RenderAppScreen = ({appScreen, dispatchInputChanges, Controllers, Wallet, Config, updateNotification}) => (<>
    {appScreen === 'app.payment.1' ? <>
        <PaymentConfigComponent
            dispatchInputChanges={dispatchInputChanges}
            Controllers={Controllers}
            Wallet={Wallet}
            Config={Config}
        />
    </> : ''}

    {appScreen === 'app.payment.2' ?  <>
      <PaymentConfirmationComponent
        dispatchInputChanges={dispatchInputChanges}
        Controllers={Controllers}
        Wallet={Wallet}
        Config={Config}
        updateNotification={updateNotification}
      />
    </> : ''}          
</>);