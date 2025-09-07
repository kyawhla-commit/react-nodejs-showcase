import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const { user, logout } = useAuth();

    if (!user) {
        return <LoginForm />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.username}>@{user.username}</Text>
            
            {user.bio && (
                <Text style={styles.bio}>{user.bio}</Text>
            )}

            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={logout}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    username: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    bio: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: "#FF3B30",
        padding: 15,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    logoutText: {
        color: "white",
        fontWeight: "bold",
    },
});
