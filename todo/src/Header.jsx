import {
	AppBar,
	Toolbar,
	Container,
	Badge,
	Button,
	Box,
	IconButton,
} from "@mui/material";

import {
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useApp } from "./AppProvider";

export default function Header({ count, clear }) {
	const { mode, setMode } = useApp();

	return (
		<AppBar position="static">
			<Toolbar>
				<Container
					maxWidth="sm"
					sx={{ display: "flex" }}>
					<Box sx={{ flexGrow: 1 }}>
						<Badge
							badgeContent={count}
							color="error">
							Todo
						</Badge>
					</Box>
					<Button
						color="inherit"
						onClick={clear}>
						Clear
					</Button>
					{mode === "dark" ? (
						<IconButton color="inherit" onClick={() => setMode("light")}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton color="inherit" onClick={() => setMode("dark")}>
							<DarkModeIcon />
						</IconButton>
					)}
				</Container>
			</Toolbar>
		</AppBar>
	);
}
