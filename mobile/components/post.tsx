import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { PostType } from "@/types/AppTypes";
import { queryClient } from "@/app/_layout";
import { useAuth } from "@/contexts/AuthContext";

export default function Post({ post }: { post: PostType }) {
    const { token, user } = useAuth();

    const isLiked = post.postLikes.some(like => like.userId === user?.id);
    
    const handleLike = async (postId: number) => {
        const res = await fetch(`http://192.168.1.5:8800/posts/${postId}/like`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		}
    };

    const handleUnlike = async (postId: number) => {
        const res = await fetch(
			`http://192.168.1.5:8800/posts/${postId}/unlike`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.ok) {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		}
    };

    return (
		<View style={styles.postCard}>
			<View style={styles.avatar}></View>
			<View style={{ flex: 1 }}>
				<View style={{ marginVertical: 5 }}>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						{post.user.name}
					</Text>
					<Text style={{ color: "gray" }}>{post.created}</Text>
				</View>
				<TouchableOpacity onPress={() => router.push(`/view/${post.id}`)}>
					<Text style={{ fontSize: 16 }}>
						{post.body}
					</Text>
				</TouchableOpacity>

				<View
					style={{
						marginTop: 10,
						flexDirection: "row",
						justifyContent: "space-around",
					}}>
					<View
						style={{
							flexDirection: "row",
							gap: 5,
							alignItems: "center",
						}}>
						
                        {isLiked ? (
                            <TouchableOpacity onPress={() => handleUnlike(post.id)}>
                                <Ionicons
                                    name="heart"
                                    color="red"
                                    size={24}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => handleLike(post.id)}>
                                <Ionicons
                                    name="heart-outline"
                                    color="red"
                                    size={24}
                                />
                            </TouchableOpacity>
                        )}

						<Text>{post.postLikes.length}</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							gap: 5,
							alignItems: "center",
						}}>
						<TouchableOpacity>
							<Ionicons
								name="chatbubble-outline"
								color="green"
								size={24}
							/>
						</TouchableOpacity>
						<Text>{post.comments.length}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postCard: {
		paddingHorizontal: 16,
        paddingVertical: 20,
		flexDirection: "row",
		gap: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
        backgroundColor: "#fff",
	},
	avatar: {
		width: 58,
		height: 58,
		borderRadius: 58,
		backgroundColor: "green",
	},
});