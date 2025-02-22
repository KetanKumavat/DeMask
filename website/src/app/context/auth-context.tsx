"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "user" | "manager";
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (
        userData: Omit<User, "id"> & { password: string }
    ) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        // Simulate API call
        console.log("Logging in...", { email, password });
        // In a real app, you would validate credentials with your backend
        setUser({
            id: "1",
            firstName: "John",
            lastName: "Doe",
            email,
            role: "user",
        });
    };

    const signup = async (
        userData: Omit<User, "id"> & { password: string }
    ) => {
        // Simulate API call
        console.log("Signing up...", userData);
        // In a real app, you would send this data to your backend
        setUser({
            id: "1",
            ...userData,
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
