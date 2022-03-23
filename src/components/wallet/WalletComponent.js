import React, {Component} from 'react';
import PaymentConfigComponent from './PaymentConfigComponent';
import PaymentConfirmationComponent from './PaymentConfirmComponent';
import Box from '@mui/material/Box';
import  {filterAssets, round} from '../../utilities/utilities';
import * as actionTypes from '../../redux/actionTypes';
import {StepsComponent} from '../elements/appElements';
import Paper from '@mui/material/Paper';
import {AvatarComponent} from '../elements/AvatarComponent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {ResetWallet} from '../../redux/actionCreators';
import Container from '@mui/material/Container';



const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_ASSET, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class Payment extends Component {

    constructor(props){
        super(props);

        this.handleResetWalletParams = this.handleResetWalletParams.bind(this);
    }
    handleResetWalletParams()
    {
        const { dispatchInputChanges } = this.props;

        ResetWallet({dispatchInputChanges});

    }
    componentDidMount(){

        const { dispatchInputChanges, Config, Wallet, Controllers, UrlParams} = this.props;
        const {amountParam, networkParam, assetParam} = UrlParams;
        const {appScreen} = Controllers;
        const {assets} = Config;
        let network = '';
        let asset = '';
        let amount = '';

        if(networkParam)
        {
            network = networkParam;

            if(network)
            {
                let availableAssets = filterAssets({Wallet, network, assets});

                dispatchInputChanges({
                    type: CONTROLLER_SELECT_NETWORK,
                    payload: {network, assets: availableAssets}
                });

                asset = assetParam;

                if(network && asset)
                {					
                    dispatchInputChanges({
                        type: CONTROLLER_SELECT_ASSET,
                        payload: asset || ''
                    });
                    
                    if(amountParam)
                    {
                        amount = amountParam;
                        const decimals = assets[asset].decimals;
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

        const {Wallet, Controllers, Config, dispatchInputChanges, updateNotification, UrlParams} = this.props;
        const {walletNameParam, walletParamError} = UrlParams;
        const {appScreen} = Controllers;
        const appScreenArr = appScreen.split('.');
        const appScreenNumber = parseFloat(appScreenArr[appScreenArr.length - 1]);

        const avatar = <AvatarComponent walletNameParam={walletNameParam} />;

        const fixParamsButton = (
            <Button
                component={Link}
                size='small'
                to={`/${Wallet.data.name}`}
                fullWidth
                type="button"
                variant='contained'
                onClick={() => this.handleResetWalletParams()}
                >{'Reload the App'}</Button>
        );

        return (

            <RenderWalletTemplate>

                {avatar}

                {walletParamError ? <>
                    {fixParamsButton}
                </> : <>
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
                </>}	


            </RenderWalletTemplate>

        );

    };
};




const RenderWalletTemplate = ({children}) => (
    <Container component="main" maxWidth="xs">
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Paper variant="outlined" sx={{width: '400px', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                {children}
            </Paper>
        </Box>
    </Container>
);

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
        ResetWallet={ResetWallet}
      />
    </> : ''}
</>);