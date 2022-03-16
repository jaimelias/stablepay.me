import React, {Component} from 'react';
import PaymentConfigComponent from './PaymentConfigComponent';
import PaymentConfirmationComponent from './PaymentConfirmComponent';
import Box from '@mui/material/Box';
import  {filterCoins, isInvalidAmountString, round} from '../../utilities/utilities';
import * as actionTypes from '../../redux/actionTypes';
import {StepsComponent} from '../elements/appElements';

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_ASSET, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class Payment extends Component {

    componentDidMount(){

        const { dispatchInputChanges, Config, Wallet, Controllers} = this.props;
        const {appScreen} = Controllers;
        const {networks, assets} = Config;
		let {amountPath, networkPath, assetPath} = this.props;
        let network = '';
        let asset = '';
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
                let availableCoins = filterCoins({Wallet, network, assets});

                dispatchInputChanges({
                    type: CONTROLLER_SELECT_NETWORK,
                    payload: {network, assets: availableCoins}
                });

                if(assets.hasOwnProperty(assetPath))
                {
                    asset = assetPath;
                }
				
               if(!assetPath)
                {
                    if(assets.hasOwnProperty(networkPath))
                    {
                        asset = networkPath;
                    }
                }
				
				if(!isInvalidAmountString(amountPath))
				{
					amount = amountPath;
				}
				

                if(network && asset)
                {					
                    if(assets.hasOwnProperty(asset))
                    {
                        if(assets[asset].addresses.hasOwnProperty(network))
                        {
                            const decimals = assets[asset].decimals;
                            amount = round({val: amount, precision: decimals});

                            
                            dispatchInputChanges({
                                type: CONTROLLER_SELECT_ASSET,
                                payload: asset || ''
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
        else{
            //handles go back
            if(appScreen === 'app.payment.2')
            {
                dispatchInputChanges({
                    type: CONTROLLER_SELECT_NETWORK,
                    payload: {network: '', assets: ''}
                });

                dispatchInputChanges({
                    type: CONTROLLER_SELECT_ASSET,
                    payload: ''
                });

                dispatchInputChanges({
                    type: CONTROLLER_CHANGE_AMOUNT,
                    payload: ''
                });	

                dispatchInputChanges({
                    type: CONTROLLER_CHANGE_APP_SCREEN,
                    payload: 'app.payment.1'
                });
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