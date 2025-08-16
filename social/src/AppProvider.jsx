import { createTheme, ThemeProvider } from "@mui/material";
import { useState, createContext, useContext, useMemo } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export default function AppProvider({ children }) {
    const [mode, setMode] = useState("dark");
    const [openDrawer, setOpenDrawer] = useState(false);

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
            },
        });
    }, [mode]);

    return (
		<AppContext.Provider value={{ mode, setMode, openDrawer, setOpenDrawer }}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</QueryClientProvider>
		</AppContext.Provider>
	);
}
