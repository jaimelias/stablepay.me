import React, {Component}  from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import  {filterAssets} from '../../utilities/utilities';
import  {isValidAmountTyping} from '../../utilities/validators';
import * as actionTypes from '../../redux/actionTypes';
import { cryptoIcons } from '../../assets/svgIcons';
import Avatar from '@mui/material/Avatar';

const {CONTROLLER_CHANGE_AMOUNT, CONTROLLER_SELECT_NETWORK, CONTROLLER_SELECT_ASSET} = actionTypes;


export default class PaymentConfigComponent extends Component {
    constructor(props){
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNetworkSelect = this.handleNetworkSelect.bind(this);
        this.handleAssetSelect = this.handleAssetSelect.bind(this);
    }

    handleAmountChange(amountParam){

        const {dispatchInputChanges} = this.props;

        if(isValidAmountTyping(amountParam))
        {
            //validats the amount while typing
            
            dispatchInputChanges({
                type: CONTROLLER_CHANGE_AMOUNT,
                payload: amountParam || ''
            });
        }
    };

    handleNetworkSelect(networkParam){
        const {dispatchInputChanges, Config, Controllers, Wallet} = this.props;
        let {asset} = Controllers;
        const {networks, assets} = Config;

        if(networks.hasOwnProperty(networkParam))
        {

            const {networkMainAsset} = networks[networkParam]
            let availableAssets = filterAssets({Wallet, assets, network: networkParam});

            //sets the network and assets
            dispatchInputChanges({
                type: CONTROLLER_SELECT_NETWORK,
                payload: {network: networkParam, assets: availableAssets}
            });

             // unsets asset if not available in network
            if(!availableAssets.hasOwnProperty(asset))
            {
                dispatchInputChanges({
                    type: CONTROLLER_SELECT_ASSET,
                    payload: ''
                });

                
                //if there is only one asset in the network set is as default
                if(availableAssets.hasOwnProperty(networkMainAsset))
                {
                    dispatchInputChanges({
                        type: CONTROLLER_SELECT_ASSET,
                        payload: networkMainAsset || ''
                    }); 
                }                
            }
        }
    }

    handleAssetSelect(assetParam){
        const {dispatchInputChanges, Controllers} = this.props;
        const {assets} = Controllers;
        if(assets.hasOwnProperty(assetParam) || assetParam === '')
        {
            dispatchInputChanges({
                type: CONTROLLER_SELECT_ASSET,
                payload: assetParam || ''
            });   
        }
    };    

    render(){

        const {Controllers, Config, Theme} = this.props;
        const {networks} = Config;
        const {amount, network, asset, assets} = Controllers;
        let availableAssets = Object.keys(assets);

        const {palette} = Theme.config;

        return (
            <>
                <FormControl fullWidth variant="filled" sx={{mb: 3}}>
                    <InputLabel id="network-label">{'Network'}</InputLabel>
                    <Select
                        labelId="network-label"
                        id="network"
                        value={network}
                        label={'Network'}
                        onChange={event => this.handleNetworkSelect(event.target.value)}
                        >
                    {
                        Object.keys(networks).map(v => <MenuItem value={v} key={v}>{<img style={{marginRight: '8px'}} width="20" height="20" src={cryptoIcons[`${v}Icon`]} alt={v}/>}{networks[v].name}</MenuItem>)
                    }
        
                    </Select>
                </FormControl>
        
        
                {(Object.keys(assets).length > 1) ? <>
                    <FormControl component="fieldset" fullWidth sx={{mb: 3}}>
                        <FormLabel component="legend">{'Coins'}</FormLabel>
                        <RadioGroup
                            disabled={!network}
                            aria-label="asset"
                            name="asset"
                            onChange={event => this.handleAssetSelect(event.target.value)}
                            value={asset}
                            >
                            {
                            
                            availableAssets
                                .map(v => <FormControlLabel key={v} value={v} control={<Radio />} label={assets[v].name} />)
                            }
                        </RadioGroup>
                    </FormControl>                
                </> : ''}
        
        
                <AmountField 
                    network={network}
                    asset={asset}
                    amount={amount}
                    handleAmountChange={this.handleAmountChange}
                    palette={palette}
                />
            </>
        )
    };
};

const AmountField = ({network, asset, amount, handleAmountChange, palette}) => {

    const {
          primary: {
            main: primaryColor, 
            contrastText: primaryContrastText
          }
      } = palette;
    
    return (                
        <TextField
            disabled={!asset || !network}
            sx={{mb: 3}}
            fullWidth
            id="amount"
            label={'Amount'}
            onChange={event => handleAmountChange(event.target.value)}
            value={amount || ''}
            autoComplete="off"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {asset ? <>
                            <img alt="paymentIcon" src={cryptoIcons[`${asset}Icon`]} width="20" height="20" />
                        </> : <>
                            <Avatar style={{backgroundColor: primaryColor, color: primaryContrastText}} alt="paymentIcon" sx={{width: 20, height: 20, fontSize: 12}} >$</Avatar>
                        </>}
    
                    </InputAdornment>
                )
            }}
            variant="filled"
        />
    );
};