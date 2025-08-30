import { Box, OutlinedInput, Button } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800";

async function fetchPost(id) {
	const res = await fetch(`${api}/posts/${id}`);
	return res.json();
}

export default function View() {
    const { register, handleSubmit } = useForm();

    const { id } = useParams();

    const { data: post, error, isLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(id),
    });

    if(isLoading) {
        return <Box>Loading...</Box>;
    }

    if (error) {
        return <Box>{error}</Box>;
    }

    const onSubmit = data => {
		console.log(data);
	};

	return (
		<Box sx={{ pb: 8 }}>
			<Post post={post} />
			
            {post.comments.map(comment => {
                return <Comment comment={comment} />
            })}

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
