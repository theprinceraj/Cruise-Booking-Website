import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utilities/fetchWithAuth.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Dual_Ring from "../../public/Dual_Ring.svg";
export default function Login() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const initialUserValues = {
        email: "",
        password: "",
    };
    const [user, setUser] = useState(initialUserValues);

    const userChangeListener = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const showLoadingSVG = document.getElementById("loadingsvg");
        showLoadingSVG.setAttribute("src", Dual_Ring);
        showLoadingSVG.style.display="inline";

        const userObject = {
            email: e.target[0].value,
            password: e.target[1].value,
        };

        console.log(userObject);

        fetchWithAuth(`/api/user/login`, {
            method: "POST",
            body: JSON.stringify(userObject),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
                if (status === 200) {
                    alert(data.message);
                    setIsLoggedIn(true);
                    showLoadingSVG.style.display="none";
                    navigate("/");
                } else {
                    alert(data.message);
                }
            });
    };
    return (
        <div className="overflow-y-scroll h-[100vh]" >
           
            <Navbar />
            <div className="signupandlogin">
                <div className="flex items-center justify-center" >
                    <form
                        onSubmit={handleLogin}
                        className="w-[100%] md:w-[420px] h-[400px] lg:h-[440px] max-h-[420px]  backdrop-blur-dk rounded-2xl p-8 container-bordershadow">
                        <h3 className="text-3xl font-medium text-center">Login</h3>

                        <label htmlFor="email" className="block mt-4 text-lg font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            style={{ backgroundColor: "lightcyan", color: "black" }}
                            id="email"
                            placeholder="Enter Email"
                            name="email"
                            value={user.email}
                            onChange={userChangeListener}
                            className="w-[100%] h-12 mt-2 rounded-md px-3 focus:outline-none"
                        />

                        <label htmlFor="password" className="block mt-8 text-lg font-medium">
                            {" "}
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            style={{ backgroundColor: "lightcyan", color: "black" }}
                            placeholder="Enter Password"
                            value={user.password}
                            onChange={userChangeListener}
                            className="w-full h-12 mt-2 rounded-md px-3 focus:outline-none"
                        />

                        <button type="submit" className="flex align-center justify-center container-bordershadow w-full mt-8 py-3 rounded-md font-semibold">
                            
                            Submit 
                            <img id="loadingsvg" style={{display:"none"}}  alt="" width={25} height={25}/>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
