import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utilities/fetchWithAuth";
import '../styles/Fix_Style.css';
import Dual_Ring from "../../public/Dual_Ring.svg";
export default function SignUp() {
    const navigate = useNavigate();
    const initialUserValues = {
        username: "",
        email: "",
        phone: "",
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

    const handleSignup = (e) => {
        e.preventDefault();

        const showLoadingSVG = document.getElementById("loadingsvg");
        showLoadingSVG.setAttribute("src", Dual_Ring);
        showLoadingSVG.style.display="inline";

        const userObject = {
            username: e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
            password: e.target[3].value,
        };

        fetchWithAuth(`/api/user/signup`, {
            method: "PUT",
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
                    showLoadingSVG.style.display="none";
                    navigate(`/verify-email/${data.userId}`);
                } else {
                    alert(data.message);
                }
            });
    };

    const phoneFieldChangeListener = (e) => {
        e.preventDefault();
        let name = e.target.name;
        if (name == "phone") {
            let value = e.target.value.replace(/[^\d]/g, "");
            setUser({
                ...user,
                [name]: value,
            });
        }
    };

    return (
        <div className="overflow-y-scroll h-[100vh]">
            <Navbar />
            <div className="signupandlogin" >

                <div className="flex items-center justify-center" >
                    <form
                        onSubmit={handleSignup}
                        className=" w-[100%] md:w-[480px] h-[660px] bg-white/10 backdrop-blur-dk rounded-2xl container-bordershadow p-12">
                        <h3 className="text-3xl font-medium text-center">Signup</h3>

                        <label htmlFor="username" className="block mt-8 text-lg font-medium" style={{ color: "white" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter Username"
                            value={user.username}
                            onChange={userChangeListener}
                            className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 placeholder-gray-300 focus:outline-none"
                            style={{ backgroundColor: "lightcyan", color: "black" }}
                            required
                        />
                        <label htmlFor="email" className="block mt-8  text-lg font-medium" style={{ color: "white" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={user.email}
                            onChange={userChangeListener}
                            className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 placeholder-gray-300 focus:outline-none"
                            style={{ backgroundColor: "lightcyan", color: "black" }}
                            required
                        />
                        <label htmlFor="phone" className="block mt-8  text-lg font-medium" style={{ color: "white" }}>
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter Phone"
                            value={user.phone}
                            onChange={phoneFieldChangeListener}
                            className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 placeholder-gray-300 focus:outline-none"
                            style={{ backgroundColor: "lightcyan", color: "black" }}
                            required
                        />

                        <label htmlFor="password" className="block mt-8  text-lg font-medium" style={{ color: "white" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            style={{ backgroundColor: "lightcyan", color: "black" }}
                            placeholder="Enter Password"
                            value={user.password}
                            onChange={userChangeListener}
                            className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 placeholder-gray-300 focus:outline-none"
                            required
                        />

                        <button
                            type="submit"
                            className="flex justify-center align-center container-bordershadow w-full mt-6 py-3 rounded-md font-semibold hover:bg-gray-200"
                            style={{ color: "white" }}>
                            Submit 
                            <img id="loadingsvg" style={{display:"none"}}  alt="" width={25} height={25}/>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
