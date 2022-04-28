import React, {Component} from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  {round} from '../../utilities/utilities';
import  {isInvalidAmountString, isValidAmountTyping} from '../../utilities/validators';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../redux/actionTypes';

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class BottomStepComponent extends Component {
    
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    };

    handleNext(){
        const {dispatchInputChanges, Controllers} = this.props;
        let {amount} = Controllers;
        const {asset, assets} = Controllers;
		const decimals = assets[asset].decimals;

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

    handleBack(){
        const {ResetWallet, dispatchInputChanges} = this.props;
        ResetWallet({dispatchInputChanges});
    }

    render()
    {
        const {Wallet, theme, appScreen, Controllers} = this.props;
        const steps = 2;
        const appScreenArr = appScreen.split('.');
        const appScreenNumber = parseFloat(appScreenArr[appScreenArr.length - 1]);
        const activeStep = appScreenNumber-1;
    
        let {amount} = Controllers;
        const {network, asset} = Controllers;
        const isInvalidAmount = (asset && network) ? isInvalidAmountString(amount) : true;	
        const {palette} = theme.config;
        const {primary} = palette;
        const {contrastText, main} = primary;
    
        const newTheme = createTheme({
            palette: {
                background: {
                    default: main
                },
                primary: {
                    main: contrastText
                }
            }
        });
    
        const disableBack = activeStep === 0;
        let disableNext = (activeStep+1) === steps;
    
        if(!disableNext)
        {
            if(!network || !asset || isInvalidAmount)
            {
                disableNext = true;
            }
        }
    
        let cofirmArr = [Wallet.data.name];
    
        if(network)
        {
                cofirmArr.push(network);
    
                cofirmArr.push(asset);
    
                if(!isInvalidAmount)
                {
                        cofirmArr.push(amount);
                }
        }
    
        const cofirmPath = cofirmArr.join('/');
    
        return (
            <ThemeProvider theme={newTheme}>
                <MobileStepper
                    variant="dots"
                    steps={steps}
                    position="static"
                    activeStep={activeStep}
                    sx={{ flexGrow: 1 }}
    
                    nextButton={
                        <Button size="small" to={disableNext ? `/${cofirmPath}` : ''} component={!disableNext ? Link : 'button'} onClick={() => this.handleNext()} disabled={disableNext}>
                             {'Next'} <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button component={!disableBack ? Link : 'button'} size="small" onClick={() => this.handleBack()} disabled={disableBack} to={`/${Wallet.data.name}`}>
                            {'Back'} <KeyboardArrowLeft  />
                        </Button>
                    }
                    />
                </ThemeProvider>
        );
    
    }
}
