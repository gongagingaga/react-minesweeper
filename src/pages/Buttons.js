import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {Fragment} from 'react';

export default function BasicButtonGroup({onFlagClick, onRevealMinesClick, onRevealBoardClick, flagClicked}) {
  return (
		<Fragment>
	  		<Box
      			sx={{
	        		display: 'flex',
			        flexDirection: 'column',
   		 		    alignItems: 'center',
       				'& > *': {
        	  			m: 1,
        			},
      			}}
    		>
		    	<ButtonGroup variant="text" aria-label="Basic button group">
		      		<Button onClick={onFlagClick}>{flagClicked}</Button>
      				<Button onClick={onRevealMinesClick}>Reveal Mines</Button>
      				<Button onClick={onRevealBoardClick}>Reveal Board</Button>
    			</ButtonGroup>
			</Box>
		</Fragment>
  );
}
