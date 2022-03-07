import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {isUrl} from '../utilities/utilities';

export default class AvatarComponent extends Component {

	render() {
		const {Wallet} = this.props;
		const {settings: {profileNFT: {src: profileNFT}}, name, description} = Wallet.data || '';
		
		const RenderAvatar = () => {

			const metaData = (
				<>
					<Typography variant="h5" component="h1" align={!profileNFT ? 'center' : 'left'} >{name}</Typography>
					{description ? <>
						<Typography variant="body2" sx={{ fontWeight: 'medium' }} align={!profileNFT ? 'center' : 'left'}>{description}</Typography>
					</> : ''}
				</>
			);

			if(isUrl(profileNFT))
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
						<Box ml={2}>
							{metaData}
						</Box>
					</Box>
				);
			}

			return metaData;
		};
	
		return (
			<Box mb={5}>
				<RenderAvatar mb={2}/>
			</Box>
		);

	};
}