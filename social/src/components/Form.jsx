import { Box, Button, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Form() {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
		console.log(data);
	};

    return (
		<Box sx={{ mb: 4 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					placeholder="What's on your mind"
					multiline
					fullWidth
					{...register("body", { required: true })}
				/>

				<Box sx={{ textAlign: "right", mt: 1 }}>
					<Button variant="contained" type="submit">
						Add Post
					</Button>
				</Box>
			</form>
		</Box>
	);
}