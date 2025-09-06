import Comment from "@/components/comment";
import Post from "@/components/post";
import { useLocalSearchParams } from "expo-router";
import { Button, ScrollView, Text, TextInput, View } from "react-native";

import type { PostType } from "@/types/AppTypes";
import { useQuery } from "@tanstack/react-query";

export default function ViewPost() {
	const { id } = useLocalSearchParams();

    const { data: post, isLoading, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: async (): Promise<PostType> => {
            const res = await fetch(`http://192.168.1.2:8800/posts/${id}`);
            return res.json();
        }
    });

    if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	if (!post) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Text>No post available</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<Post post={post} />
			<View style={{ margin: 10 }}>
				<View style={{ marginBottom: 10 }}>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						Comments ({post.comments.length})
					</Text>
				</View>
				<TextInput
					multiline={true}
					style={{ height: 80, padding: 20, fontSize: 16, borderWidth: 1, borderColor: "#ccc", flex: 1, marginBottom: 10, }}
					placeholder="Your comment"
				/>
				<Button title="Add Comment" />
			</View>
			{post.comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />
            })}
		</ScrollView>
	);
}
