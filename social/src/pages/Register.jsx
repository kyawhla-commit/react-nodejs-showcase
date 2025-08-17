import { Box, OutlinedInput, Typography, Button } from "@mui/material";

import { useForm } from "react-hook-form";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
		<Box>
			<Typography
				variant="h2"
				sx={{ mb: 4 }}>
				Register
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					placeholder="Name"
					fullWidth
					{...register("name", { required: true })}
				/>
				{errors.username && (
					<Typography color="error">Name is required</Typography>
				)}

				<OutlinedInput
					sx={{ mt: 2 }}
					placeholder="Username"
					fullWidth
					{...register("username", { required: true })}
				/>
				{errors.username && (
					<Typography color="error">Username is required</Typography>
				)}

				<OutlinedInput
					sx={{ mt: 2 }}
					placeholder="Short bio"
					fullWidth
					{...register("bio")}
				/>

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
					Register
				</Button>
			</form>
		</Box>
	);
}
