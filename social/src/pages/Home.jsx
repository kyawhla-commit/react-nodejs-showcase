import { Box } from "@mui/material";
import Post from "../components/Post";
import Form from "../components/Form";

export default function Home() {
    return <Box>
        <Form />
        <Post />
        <Post />
    </Box>
}