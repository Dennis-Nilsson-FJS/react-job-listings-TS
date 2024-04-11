import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

interface AuthContextProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<User | null>(null);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log("user: ", user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
