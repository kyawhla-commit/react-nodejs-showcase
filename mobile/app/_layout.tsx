import { Stack } from "expo-router";

export default function RootLayout() {
	return (
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
	);
}
