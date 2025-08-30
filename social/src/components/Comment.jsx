import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { DeleteOutline as DeleteIcon } from "@mui/icons-material";

export default function Comment({ comment }) {
	return (
		<Box sx={{ p: 2, border: "1px solid #aaaaaa40", mb: 2 }}>
			<IconButton sx={{ float: "right" }}>
				<DeleteIcon sx={{ color: "gray" }} />
			</IconButton>
			<Box sx={{ display: "flex", gap: 4 }}>
				<Box>
					<Avatar sx={{ width: 48, height: 48, background: "grey" }}>
						{comment.user.name[0]}
					</Avatar>
				</Box>
				<Box>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Typography>{comment.user.name}</Typography>
						<Typography sx={{ opacity: 0.4 }}>
							@{comment.user.username}
						</Typography>
					</Box>
					<Typography sx={{ color: "green", fontSize: 14 }}>
						{comment.created}
					</Typography>
					<Typography sx={{ fontSize: 18 }}>
						{comment.content}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
