import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default class AvatarComponent extends Component {

	render() {
		const {Wallet} = this.props;
		const {settings, name} = Wallet.data;
		let profileNFT = '';
		
		if(settings.hasOwnProperty('profileNFT'))
		{
			profileNFT = settings.profileNFT.src;
		}
		
		const RenderAvatar = () => {
			
			if(profileNFT)
			{
				return (
					<Box display="flex" flexDirection="row" alignItems="center">
						<Box>
							<Avatar
								sx={{width: 75, height: 75}}
								alt={`${name} - Profile NFT`}
								src={profileNFT}
								id="profileNFT"
								variant="rounded"
								/>
						</Box>
						<Box ml={1}>
							<Typography variant="h5" component="h1" align="center">{name}</Typography>
						</Box>
					</Box>
				);
			}
			
			return '';
		};
	
		return (
			<Box mb={5}>
				<RenderAvatar mb={2}/>
			</Box>
		);

	};
}