import { Box } from "@mui/material";
import Post from "../components/Post";
import Form from "../components/Form";

import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800";

async function fetchPosts() {
    const res = await fetch(`${api}/posts`);
    return res.json();
}

export default function Home() {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if(isLoading) {
        return <Box>Loading...</Box>;
    }

    if (error) {
		return <Box>{error}</Box>;
	}

    return <Box>
        <Form />
        {posts.map(post => {
            return <Post key={post.id} post={post} />
        })}
    </Box>
}
