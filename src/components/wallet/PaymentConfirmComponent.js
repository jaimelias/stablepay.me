import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import  {abbreviateAddress, getRecipient} from '../../utilities/utilities';
import {CopyListItem} from '../elements/appElements';
import { cryptoIcons, appIcons } from '../../assets/svgIcons';

const {copyIcon} = appIcons;

export default class PaymentConfirmationComponent extends Component {

    constructor(props){
        super(props);

        this.handleOpenExplorer = this.handleOpenExplorer.bind(this);
        this.handleGoConfigComponent = this.handleGoConfigComponent.bind(this);
    }


    handleOpenExplorer({asset, network}){
        const {Config, Controllers} = this.props;
        const {assets} = Controllers
        const {networks} = Config;

        if(assets[asset] && networks[network].explorer)
        {
            const explorerUrl = networks[network].explorer + assets[asset].addresses[network];

            window.open(explorerUrl, "_blank")
        }
    }

    handleGoConfigComponent(){
        const {dispatchInputChanges, ResetWallet} = this.props;

        ResetWallet({dispatchInputChanges});
    }

    render()
    {
        const {Wallet, Controllers, Config, updateNotification} = this.props;
        const {amount, network, asset, assets} = Controllers;
        const {networks} = Config;
        const recipientWallet = (Wallet.status === 'ok.wallet') ? getRecipient({network, Wallet}) : {};
        const {address: recipientWalletAddress, memo: recipientWalletMemo} = recipientWallet || '';
        
        let explorerBtnAttr = false;
        let explorerOnClick = () => true;

        if(asset && network)
        {
            if(assets[asset].addresses[network] !== true)
            {
                explorerBtnAttr = true;
                explorerOnClick = () => this.handleOpenExplorer({asset, network});
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
                            <img src={cryptoIcons[`${asset}Icon`]} alt={asset}  width="40" height="40"/>
                        </ListItemAvatar>
                        <ListItemText primary={<Typography variant="h5">{amount}</Typography>} secondary={assets[asset].name} />
                    </ListItem>  
                    
					
					{asset !== network ? <>
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
                        image={copyIcon}
						updateNotification={updateNotification}
                        />

                    {recipientWalletMemo ? <>
                        <Divider variant="inset" component="li" />

                        <CopyListItem 
                            copyThis={recipientWalletMemo}
                            label={'Memo'}
                            message={'Memo copied to clipboard!'}
                            image={copyIcon}
							updateNotification={updateNotification}
                            />                      
                    </> : ''}
                   
                </List>
                <Button onClick={() => this.handleGoConfigComponent()} size="small" component={Link} to={`/${Wallet.data.name}`}>{'Go back'}</Button>
            </>
        );        
    }
}