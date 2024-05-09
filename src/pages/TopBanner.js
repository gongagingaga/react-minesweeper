import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import {Button} from "@mui/material";
import MyFlower from "../minesweeperSprites/pixil-frame-0.png";
import "./ButtonAnimation.css";
import "./Button.css";

const TopBanner = (props) => {

	const {title, spin, onClick} = props;

    return (
        <Box
            sx={{
                height: 130,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4">{title}</Typography>
            <Button
                variant="contained"
                startIcon={<Avatar src={MyFlower} />}
                onClick={onClick}
				disableRipple
				className={spin ? 'spin myButton' : 'myButton'} 
				sx={{
					backgroundColor: 'transparent', 
					boxShadow: 'none', 
					'&:hover': {
						boxShadow: 'none', // remove box shadow on hover
					},
					'&:focus': {
						outline: 'none', // remove focus outline
					},
				}}
            ></Button>
        </Box>
    );
};

export default TopBanner;
