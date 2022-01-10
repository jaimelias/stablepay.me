import React from 'react';
import Box from '@mui/material/Box';
import  {stablecoins} from '../assets/config';


export const DisplayStableLogos = () => {

    return (
        <Box sx={{mt: 2, alignItems: 'center'}}>
            {
                Object.keys(stablecoins)
                    .map((v, i) => ( <img key={i} alt={v} src={`/assets/crypto/${v}.svg`} width="40" height="40" />))
            }
        </Box>
    );
};