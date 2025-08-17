import { Box, OutlinedInput, Typography, Button } from "@mui/material";

import { useForm } from "react-hook-form";
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";

export default function Login() {
    const { setAuth } = useApp();

    const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		console.log(data);
        setAuth({ name: 'Alice' });
        navigate("/");
	};

	return (
		<Box>
			<Typography
				variant="h2"
				sx={{ mb: 4 }}>
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					placeholder="Username"
					fullWidth
					{...register("username", { required: true })}
				/>
				{errors.username && (
					<Typography color="error">Username is required</Typography>
				)}

				<OutlinedInput
					sx={{ mt: 2 }}
					type="password"
					placeholder="Password"
					fullWidth
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<Typography color="error">Password is required</Typography>
				)}

				<Button
					type="submit"
					sx={{ mt: 2 }}
					variant="contained"
					fullWidth>
					Login
				</Button>
			</form>
		</Box>
	);
}
