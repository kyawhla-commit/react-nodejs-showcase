import { useState } from "react";

import { Alert, Box, OutlinedInput, Typography, Button } from "@mui/material";

import { useForm } from "react-hook-form";
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";

const api = "http://localhost:8800";

export default function Login() {
	const { setAuth } = useApp();
	const [error, setError] = useState();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		fetch(`${api}/users/login`, {
			method: "POST",
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async res => {
				if (res.status === 200) {
					const { token, user } = await res.json();
					localStorage.setItem("token", token);
					setAuth(user);
					navigate("/");
				} else {
					setError("Invalid username or password");
				}
			})
			.catch(() => {
				setError("Unable to connect api server");
			});
	};

	return (
		<Box>
			<Typography
				variant="h2"
				sx={{ mb: 4 }}>
				Login
			</Typography>

			{error && (
				<Alert
					severity="warning"
					sx={{ mb: 4 }}>
					{error}
				</Alert>
			)}

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
