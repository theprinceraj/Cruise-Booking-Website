import { createContext, useState, useEffect } from "react";
import { fetchWithAuth } from "../utilities/fetchWithAuth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            fetchWithAuth(`/api/user/session-status`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setIsLoggedIn(data?.isLoggedIn);
                });
        } catch (error) {
            console.log("Error checking session status: ", error);
            setIsLoggedIn(false);
        }
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
