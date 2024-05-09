import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const MessageCenter = props => {
	let msg = props.msg;
    return (
        <Box sx={{
            width: "100%",
            height: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h4">
				{msg}
            </Typography>
        </Box>
    )
};

export default MessageCenter;
