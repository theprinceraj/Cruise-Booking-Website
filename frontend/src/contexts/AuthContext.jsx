import { createContext, useState, useEffect } from "react";
import { getCookie } from "../utilities/checkIsLoggedIn.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const sessionId = getCookie("sessionId");
        if (sessionId) {
            console.log("session id:", sessionId);
            setIsLoggedIn(true);
        }
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
