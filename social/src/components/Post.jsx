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
	Favorite as FilledLikeIcon,
	FavoriteBorder as LikeIcon,
	ChatBubbleOutlineOutlined as CommentIcon,
    DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useApp } from "../AppProvider";
import { useQueryClient } from "@tanstack/react-query";

export default function Post({ post }) {
	const navigate = useNavigate();
	const { user } = useApp();
	const queryClient = useQueryClient();

	const isLiked = post.postLikes?.some(like => like.userId === user?.id);

	const handleLike = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(`http://localhost:8800/posts/${post.id}/like`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.ok) {
				queryClient.invalidateQueries({ queryKey: ["posts"] });
			}
		} catch (err) {
			console.error("Error liking post:", err);
		}
	};

	const handleUnlike = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(`http://localhost:8800/posts/${post.id}/unlike`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.ok) {
				queryClient.invalidateQueries({ queryKey: ["posts"] });
			}
		} catch (err) {
			console.error("Error unliking post:", err);
		}
	};

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
						<IconButton onClick={isLiked ? handleUnlike : handleLike}>
							{isLiked ? (
								<FilledLikeIcon color="error" />
							) : (
								<LikeIcon color="error" />
							)}
						</IconButton>
						<Button
							variant="text"
							size="sm">
							{post.postLikes?.length || 0}
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
