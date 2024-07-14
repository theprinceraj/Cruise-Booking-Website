import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

function SignUpLogin({ isLoginForm }) {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center" style={{ marginTop: 60 }}>
                {isLoginForm ? <Login /> : <SignUp />}
            </div>
        </>
    );
}

export default SignUpLogin;
