import Post from "@/components/post";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text, View } from "react-native";

import type { PostType } from "@/types/AppTypes";

export default function Index() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async (): Promise<PostType[]> => {
            const res = await fetch("http://192.168.1.5:8800/posts");
            return res.json();
        }
    });

    if(isLoading) {
        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Loading...</Text>
        </View>;
    }

    if(error) {
        return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
				<Text>{error.message}</Text>
			</View>
		);
    }

    if(!posts) {
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
			{posts.map(post => {
                return <Post key={post.id} post={post} />
            })}
		</ScrollView>
	);
}
