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

export default function AppDrawer() {
    const { openDrawer, setOpenDrawer } = useApp();

	return (
		<Drawer
			open={openDrawer}
			anchor="left"
			onClose={() => setOpenDrawer(false)}>
			<Box sx={{ width: 250, height: 150, bgcolor: "gray" }}></Box>
			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<ProfileIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<LoginIcon />
						</ListItemIcon>
						<ListItemText primary="Login" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<RegisterIcon />
						</ListItemIcon>
						<ListItemText primary="Register" />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
}
