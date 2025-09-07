import { useAuth } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginForm() {
    const { setUser, setToken } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const handleSubmit = async () => {

        if (!username || !password) {
            setError("Username and password are required");
            return;
        }

        try {
            const res = await fetch("http://192.168.1.5:8800/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const { token, user } = await res.json();
                await AsyncStorage.setItem("token", token);
                setToken(token);
                setUser(user);
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("Unable to connect to server");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {error && (
                <Text style={styles.error}>{error}</Text>
            )}

            <TextInput
                ref={usernameRef}
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />

            <TextInput
                ref={passwordRef}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
});
