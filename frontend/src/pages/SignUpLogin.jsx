import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

function SignUpLogin({ isLoginForm }) {
    return (
        <>
            <Navbar />
            {isLoginForm ? <Login /> : <SignUp />}
        </>
    );
}

export default SignUpLogin;
