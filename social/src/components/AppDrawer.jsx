import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
    ListItemButton,
    Divider,
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
			<Box sx={{ width: 250, height: 150, bgcolor: "gray" }}></Box>
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
							<ListItemButton onClick={() => {
                                setAuth(undefined);
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
