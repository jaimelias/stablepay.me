import React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MuiAlert from '@mui/material/Alert';
import { assets } from '../../assets/config';
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

const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const DisplayStableLogos = () => {

		return (
				<Box sx={{my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						{
								Object.keys(assets)
										.map((v, i) => <img key={i} alt={v} style={{margin: '2px'}} src={`/assets/crypto/${v}.svg`} width="40" height="40" />)
						}
				</Box>
		);
};

export const CopyListItem = ({copyThis, label, message, image, labelSanitizer, updateNotification}) => {
	
		const handleCopy = copyThis => {
				navigator.clipboard.writeText(copyThis)
				updateNotification({open: true, message})
		};

		if(labelSanitizer)
		{
			copyThis = labelSanitizer(copyThis);
		}
	
		return (
				<>
						<ListItem button onClick={()=> handleCopy(copyThis)}>
								<ListItemAvatar>
								<img src={image} alt="contract" width="40" height="40" />
								</ListItemAvatar>
								<ListItemText primary={copyThis} secondary={label} />
						</ListItem>

				</>
		);
}

export const NotificationComponent = ({updateNotification, notification, palette}) => {

	const {open, message} = notification;

	const {
		secondary:
			{
				main: secondaryColor,
				contrastText: secondaryContrastText
			}
	} = palette;

		const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
				return;
			}
		
			updateNotification({open: false, message: ''})
		};

	return(
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
			<Alert onClose={handleClose} sx={{ width: '100%', backgroundColor: secondaryColor, color:  secondaryContrastText}}>
				{message}
			</Alert>
		</Snackbar>	
	);
};

export const BottomStepComponent = ({Wallet, theme, appScreen, ResetWallet, dispatchInputChanges, Controllers}) => {


	const steps = 2;
	const appScreenArr = appScreen.split('.');
	const appScreenNumber = parseFloat(appScreenArr[appScreenArr.length - 1]);
	const activeStep = appScreenNumber-1;

	let {amount} = Controllers;
	const {network, asset, assets} = Controllers;
	const isInvalidAmount = (asset && network) ? isInvalidAmountString(amount) : true;	

	const handleNext = () => {
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
	};

	const handleBack = () => {
		ResetWallet({dispatchInputChanges});
	};

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
					<Button size="small" to={disableNext ? `/${cofirmPath}` : ''} component={!disableNext ? Link : 'button'} onClick={handleNext} disabled={disableNext}>
						 {'Next'} <KeyboardArrowRight />
					</Button>
				}
				backButton={
					<Button component={!disableBack ? Link : 'button'} size="small" onClick={handleBack} disabled={disableBack} to={`/${Wallet.data.name}`}>
						{'Back'} <KeyboardArrowLeft  />
					</Button>
				}
				/>
			</ThemeProvider>
	);

}