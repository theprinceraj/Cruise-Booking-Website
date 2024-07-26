import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoggedIn) {
            alert("You must be logged in to view this page");
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? children : null;
};

export default PrivateRoute;
