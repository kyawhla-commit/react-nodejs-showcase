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

export default function Post() {
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
							sx={{ width: 64, height: 64, background: "green" }}
						/>
					</Box>
					<Box>
						<Box sx={{ display: "flex", gap: 1 }}>
							<Typography>Alice Rhys</Typography>
							<Typography sx={{ opacity: 0.4 }}>
								@alice
							</Typography>
						</Box>
						<Typography sx={{ color: "green", fontSize: 14 }}>
							a few seconds ago
						</Typography>
						<Typography
							sx={{ fontSize: 21, cursor: "pointer" }}
							onClick={() => navigate("/view")}>
							Lorem, ipsum dolor sit amet consectetur adipisicing
							elit. Sapiente laboriosam consequuntur impedit
							temporibus! Repellat eveniet
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
							10
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton>
							<CommentIcon color="success" />
						</IconButton>
						<Button
							variant="text"
							size="sm">
							5
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
