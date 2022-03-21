import MainComponent from '../MainComponent';
import WalletComponent from '../wallet/WalletComponent';
import { useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import WalletNotFoundComponent from '../WalletNotFoundComponent';


export const RouteMainComponent = () => (<MainComponent {...useOutletContext()} />);

export const RouteWalletComponent = () => {

    const context = useOutletContext();
    const {Wallet: {status}, UrlParams: {walletNameParam}} = context;

    if(status === 'ok')
    {
        return <WalletComponent {...context} />;
    }
    else if(status === 'loading')
    {
        return (
            <Box sx={{my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        );
    }
    else
    {
        return <WalletNotFoundComponent walletNameParam={walletNameParam} />
    }
    
};