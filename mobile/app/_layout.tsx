import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Stack>
					<Stack.Screen
						name="(home)"
						options={{ title: "Home" }}
					/>
					<Stack.Screen
						name="view/[id]"
						options={{ title: "Post Detail" }}
					/>
				</Stack>
			</AuthProvider>
		</QueryClientProvider>
	);
}
