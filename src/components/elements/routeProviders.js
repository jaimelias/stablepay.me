import MainComponent from '../MainComponent';
import WalletComponent from '../wallet/WalletComponent';
import { useOutletContext } from 'react-router-dom';

export const RouteMainComponent = () => (<MainComponent {...useOutletContext()} />);

export const RouteWalletComponent = () => (<WalletComponent {...useOutletContext()} />);