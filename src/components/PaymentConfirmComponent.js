import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import  {abbreviateAddress, getRecipient} from '../utilities/utilities';
import {CopyListItem} from './appElements';
import { cryptoIcons, appIcons } from '../assets/svgIcons';
import * as actionTypes from '../redux/actionTypes';
import { Link } from 'react-router-dom';


const {contractIcon} = appIcons;

const {CONTROLLER_CHANGE_APP_SCREEN} = actionTypes;

export default class PaymentConfirmationComponent extends Component {


    constructor(props){
        super(props);

        this.handleOpenExplorer = this.handleOpenExplorer.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }


    handleOpenExplorer({coin, network}){
        const {Config, Controllers} = this.props;
        const {coins} = Controllers
        const {networks} = Config;

        if(coins[coin] && networks[network].explorer)
        {
            const explorerUrl = networks[network].explorer + coins[coin].addresses[network];

            window.open(explorerUrl, "_blank")
        }
    }

    handleGoBack(){
        const {dispatchInputChanges} = this.props;

        dispatchInputChanges({
            type: CONTROLLER_CHANGE_APP_SCREEN,
            payload: 'app.payment.1'
        });
    }

    render()
    {
        const {Wallet, Controllers, Config, updateNotification} = this.props;
        const {amount, network, coin, coins} = Controllers;
        const {networks} = Config;
        const recipientWallet = (Wallet.status === 'ok') ? getRecipient({network, Wallet}) : {};
        const {address: recipientWalletAddress, memo: recipientWalletMemo} = recipientWallet || '';
        
        let explorerBtnAttr = false;
        let explorerOnClick = () => true;

        if(coin && network)
        {
            if(coins[coin].addresses[network] !== true)
            {
                explorerBtnAttr = true;
                explorerOnClick = () => this.handleOpenExplorer({coin, network});
            }
        }       

        return (
            <>
                <List
                    component="nav"
                    sx={{
                    mb: 3,
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    }}
                >
                    <Divider variant="inset" component="li" />
                    <ListItem button={explorerBtnAttr} onClick={() => explorerOnClick()}>
                        <ListItemAvatar>
                            <img src={cryptoIcons[`${coin}Icon`]} alt={coin}  width="40" height="40"/>
                        </ListItemAvatar>
                        <ListItemText primary={<Typography variant="h5">{amount}</Typography>} secondary={coins[coin].name} />
                    </ListItem>  
                    
					
					{coin !== network ? <>
						<Divider variant="inset" component="li" />
						
						<ListItem>
							<ListItemAvatar>
								<img src={cryptoIcons[`${network}Icon`]} alt={network}  width="40" height="40" />
							</ListItemAvatar>
							<ListItemText primary={networks[network].name} secondary={'Network'} />
						</ListItem>					
					</> : ''}

                    <Divider variant="inset" component="li" />

                    <CopyListItem 
                        copyThis={recipientWalletAddress}
                        labelSanitizer={abbreviateAddress}
                        label={'Recipient Address'}
                        message={'Recipient address copied to clipboard!'}
                        image={contractIcon}
						updateNotification={updateNotification}
                        />

                    {recipientWalletMemo ? <>
                        <Divider variant="inset" component="li" />

                        <CopyListItem 
                            copyThis={recipientWalletMemo}
                            label={'Memo'}
                            message={'Memo copied to clipboard!'}
                            image={contractIcon}
							updateNotification={updateNotification}
                            />                      
                    </> : ''}
                   
                </List>
                <Button variant="outlined" size="small" component={Link} to={`/${Wallet.data.name}`}>{'Go back'}</Button>
            </>
        );        
    }
}