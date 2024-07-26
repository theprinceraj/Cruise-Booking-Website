import { createContext, useState, useEffect } from "react";
import { checkIsLoggedIn } from "../utilities/checkIsLoggedIn.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(checkIsLoggedIn());
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
