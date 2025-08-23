import { Box, OutlinedInput, Button } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

import { useForm } from "react-hook-form";

export default function View() {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
		console.log(data);
	};

	return (
		<Box sx={{ pb: 8 }}>
			<Post />
			<Comment />

			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					fullWidth
					multiline
					sx={{ my: 2 }}
					placeholder="Your comment"
					{...register("content", { required: true })}
				/>
				<Button type="submit" variant="contained" fullWidth>
					Add Comment
				</Button>
			</form>
		</Box>
	);
}
