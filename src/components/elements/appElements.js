import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MuiAlert from '@mui/material/Alert';

import { coins } from '../../assets/config';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const DisplayStableLogos = () => {

    return (
        <Box sx={{my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {
                Object.keys(coins)
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

export const NotificationComponent = ({updateNotification, notification}) => {

	const {open, message} = notification;

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
	  
      updateNotification({open: false, message: ''})
    };

	return(
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>	
	);
};

export const StepsComponent = ({steps, appScreenNumber}) => {

  return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={appScreenNumber} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
};