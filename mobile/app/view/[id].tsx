import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ViewPost() {
	const { id } = useLocalSearchParams();

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontSize: 24, fontWeight: "bold" }}>View {id}</Text>
		</View>
	);
}
