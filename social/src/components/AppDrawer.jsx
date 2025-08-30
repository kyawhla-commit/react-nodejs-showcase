import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemButton,
	Divider,
	Typography,
} from "@mui/material";

import {
	Home as HomeIcon,
	AccountCircle as ProfileIcon,
	Login as LoginIcon,
	ExitToApp as LogoutIcon,
	PersonAdd as RegisterIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

import { useNavigate } from "react-router";

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer, auth, setAuth } = useApp();

	const navigate = useNavigate();

	return (
		<Drawer
			open={openDrawer}
			anchor="left"
			onClose={() => setOpenDrawer(false)}
			onClick={() => setOpenDrawer(false)}>
			<Box
				sx={{
					p: 2,
					width: 250,
					height: 150,
					display: "flex",
					alignItems: "flex-end",
					bgcolor: auth ? "green" : "gray",
				}}>
				{auth && <Typography variant="h5">{auth.name}</Typography>}
			</Box>
			<List>
				<ListItem>
					<ListItemButton onClick={() => navigate("/")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				<Divider />

				{auth && (
					<>
						<ListItem>
							<ListItemButton
								onClick={() => navigate("/profile")}>
								<ListItemIcon>
									<ProfileIcon />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton
								onClick={() => {
									setAuth(undefined);
									localStorage.removeItem("token");
									navigate("/");
								}}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</>
				)}

				{!auth && (
					<>
						<ListItem>
							<ListItemButton onClick={() => navigate("/login")}>
								<ListItemIcon>
									<LoginIcon />
								</ListItemIcon>
								<ListItemText primary="Login" />
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton
								onClick={() => navigate("/register")}>
								<ListItemIcon>
									<RegisterIcon />
								</ListItemIcon>
								<ListItemText primary="Register" />
							</ListItemButton>
						</ListItem>
					</>
				)}
			</List>
		</Drawer>
	);
}
