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

export default function Header({ count, clear }) {
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
					<IconButton color="inherit">
						<DarkModeIcon />
					</IconButton>
				</Container>
			</Toolbar>
		</AppBar>
	);
}