import { useState } from "react";

export default function SignUp() {
    const initialUserValues = {
        username: "",
        email: "",
        phone: "",
        password: "",
    };
    const URL = "http://localhost:3000/signup";

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
        const userObject = {
            username: e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
            password: e.target[3].value,
        };

        console.log(userObject);
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
        <div className="flex items-center justify-center " style={{ marginTop: 60 }}>
            <form
                onSubmit={handleSignup}
                className=" w-[480px] h-[660px] bg-white/10 backdrop-blur-dk rounded-2xl container-bordershadow p-12">
                <h3 className="text-3xl font-medium text-white text-center" style={{ color: "white" }}>
                    Signup
                </h3>

                <label
                    htmlFor="username"
                    className="block mt-8 text-white text-lg font-medium"
                    style={{ color: "white" }}>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Username"
                    value={user.username}
                    onChange={userChangeListener}
                    className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                    style={{ backgroundColor: "lightcyan" }}
                    required
                />
                <label htmlFor="email" className="block mt-8 text-white text-lg font-medium" style={{ color: "white" }}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={userChangeListener}
                    className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                    style={{ backgroundColor: "lightcyan" }}
                    required
                />
                <label htmlFor="phone" className="block mt-8 text-white text-lg font-medium" style={{ color: "white" }}>
                    Phone
                </label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={user.phone}
                    onChange={phoneFieldChangeListener}
                    className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                    style={{ backgroundColor: "lightcyan" }}
                />

                <label
                    htmlFor="password"
                    className="block mt-8 text-white text-lg font-medium"
                    style={{ color: "white" }}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    style={{ backgroundColor: "lightcyan" }}
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={userChangeListener}
                    className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                    required
                />

                <button
                    type="submit"
                    className="container-bordershadow w-full mt-6 bg-white text-[#080710] py-3 rounded-md font-semibold hover:bg-gray-200"
                    style={{ color: "white" }}>
                    Submit
                </button>
            </form>
        </div>
    );
}
