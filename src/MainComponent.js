import React from 'react';
import NotFoundWallet from './components/NotFoundComponent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Outlet, useOutletContext  } from "react-router-dom";
import {isValidSlug} from './utilities/utilities';
import WalletComponent from './components/WalletComponent';


export const MainComponent = () => {
	const {walletPath, networkPath, assetPath, amountPath} = useOutletContext();
	const validSlug = isValidSlug(walletPath);

	return (
		
			<Container component="main" maxWidth="xs">
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					{validSlug ? <>
						<WalletComponent>
							<Outlet context={{walletPath, networkPath, assetPath, amountPath}} />
						</WalletComponent>
					</> : <>
						<NotFoundWallet />
					</>}
				</Box>
			</Container>
	);
};