import { Box, OutlinedInput, Button } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

export default function View() {
	return <Box sx={{ pb: 8 }}>
        <Post />
        <Comment />
        <Comment />
        <Comment />

        <form>
            <OutlinedInput fullWidth multiline sx={{ my: 2 }} placeholder="Your comment" />
            <Button type="submit" variant="contained" fullWidth>Add Comment</Button>
        </form>
    </Box>;
}
