import { CommentType } from "@/types/AppTypes";
import { StyleSheet, Text, View } from "react-native";

export default function Comment({ comment }: { comment: CommentType }) {
	return (
		<View style={styles.commentCard}>
			<View style={styles.avatar}></View>
			<View style={{ flex: 1 }}>
				<View style={{ marginVertical: 5 }}>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						{comment.user.name}
					</Text>
					<Text style={{ color: "gray" }}>{comment.created}</Text>
				</View>
				<Text style={{ fontSize: 16 }}>
					{comment.content}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	commentCard: {
		paddingHorizontal: 16,
		paddingVertical: 20,
		flexDirection: "row",
		gap: 15,
		borderBottomWidth: 1,
		borderColor: "#ccc",
        marginHorizontal: 10,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 48,
		backgroundColor: "gray",
	},
});
