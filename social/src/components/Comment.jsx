import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { DeleteOutline as DeleteIcon, } from "@mui/icons-material";

export default function Comment() {
	return (
		<Box sx={{ p: 2, border: "1px solid #aaaaaa40", mb: 2 }}>
			<IconButton sx={{ float: "right" }}><DeleteIcon sx={{ color: "gray" }} /></IconButton>
			<Box sx={{ display: "flex", gap: 4 }}>
				<Box><Avatar sx={{ width: 48, height: 48, background: "grey" }} /></Box>
				<Box>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Typography>Bob Sorin</Typography>
						<Typography sx={{ opacity: 0.4 }}>@bob</Typography>
					</Box>
					<Typography sx={{ color: "green", fontSize: 14 }}>a few seconds ago</Typography>
					<Typography sx={{ fontSize: 18 }}>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Sapiente laboriosam consequuntur.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
