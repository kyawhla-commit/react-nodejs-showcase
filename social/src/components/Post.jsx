import {
	Box,
	Card,
	CardContent,
	Typography,
	Avatar,
	ButtonGroup,
	IconButton,
	Button,
} from "@mui/material";
import {
	FavoriteBorder as LikeIcon,
	ChatBubbleOutlineOutlined as CommentIcon,
    DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function Post({ post }) {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<IconButton sx={{ float: "right" }}>
					<DeleteIcon sx={{ color: "gray" }} />
				</IconButton>
				<Box sx={{ display: "flex", gap: 4 }}>
					<Box>
						<Avatar
							sx={{ width: 64, height: 64, background: "green" }}>
							{post.user.name[0]}
						</Avatar>
					</Box>
					<Box>
						<Box sx={{ display: "flex", gap: 1 }}>
							<Typography>{post.user.name}</Typography>
							<Typography sx={{ opacity: 0.4 }}>
								@{post.user.username}
							</Typography>
						</Box>
						<Typography sx={{ color: "green", fontSize: 14 }}>
							{post.created}
						</Typography>
						<Typography
							sx={{ fontSize: 21, cursor: "pointer" }}
							onClick={() => navigate(`/view/${post.id}`)}>
							{post.body}
						</Typography>
					</Box>
				</Box>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						mt: 2,
					}}>
					<ButtonGroup>
						<IconButton>
							<LikeIcon color="error" />
						</IconButton>
						<Button
							variant="text"
							size="sm">
							0
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton
							onClick={() => navigate(`/view/${post.id}`)}>
							<CommentIcon color="success" />
						</IconButton>
						<Button
							variant="text"
							size="sm">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
