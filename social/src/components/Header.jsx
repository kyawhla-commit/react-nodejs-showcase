import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {
    Menu as MenuIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

export default function Header() {
    const { mode, setMode, setOpenDrawer } = useApp();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						sx={{ mr: 2 }}
                        onClick={() => setOpenDrawer(true)}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}>
						Social
					</Typography>
					<div>
						{mode === "dark" ? (
							<IconButton
								size="large"
								color="inherit"
                                onClick={() => setMode("light")}>
								<LightModeIcon />
							</IconButton>
						) : (
							<IconButton
								size="large"
								color="inherit"
                                onClick={() => setMode("dark")}>
								<DarkModeIcon />
							</IconButton>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
