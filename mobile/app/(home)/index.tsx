import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontSize: 24, fontWeight: "bold" }}>Home</Text>
			<View style={{ marginTop: 20 }}>
				<Link href="/view/123">View 123</Link>
			</View>
		</View>
	);
}
