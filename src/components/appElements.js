import React from 'react';
import  {abbreviateAddress} from '../utilities/utilities';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MuiAlert from '@mui/material/Alert';
import contractIcon from '../assets/svg/icons/contract.svg';
import { coins } from '../assets/config';

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

export const RecipientAddressListItem = ({walletAddress, recipientAddressLabel, successMessage}) => {
    const [open, setOpen] = React.useState(false);
  
    const handleCopyRecipientAddress = walletAddress => {
        navigator.clipboard.writeText(walletAddress)
        setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  

  
    return (
        <>
            <ListItem button onClick={()=> handleCopyRecipientAddress(walletAddress)}>
                <ListItemAvatar>
                <img src={contractIcon} alt="contract" width="40" height="40" />
                </ListItemAvatar>
                <ListItemText primary={abbreviateAddress(walletAddress)} secondary={recipientAddressLabel} />
            </ListItem>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
  }