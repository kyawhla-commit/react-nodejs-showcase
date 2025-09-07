import type { UserType } from "@/types/AppTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = Omit<UserType, "password" | "created">;

type AuthContextType = {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Load token from storage on app start
        AsyncStorage.getItem("token").then(savedToken => {
            if (savedToken) {
                setToken(savedToken);
                // Verify token and get user info
                fetch("http://192.168.1.5:8800/users/verify", {
                    headers: {
                        "Authorization": `Bearer ${savedToken}`
                    }
                })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error("Invalid token");
                })
                .then(userData => setUser(userData))
                .catch(() => {
                    AsyncStorage.removeItem("token");
                    setToken(null);
                });
            }
        });
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
