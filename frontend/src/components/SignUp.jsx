import { useState } from "react";

export default function SignUp(){
    const initialUserValues = {
        username:"",
        email:"",
        password:"",
    };

    const [user, setUser] = useState(initialUserValues);

    const userChangeListener=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]:value,
        });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
    };

    return  (
        <div className="flex items-center justify-center" style={{ marginTop: 60 }}>
            {/* form changes -> relative removed, height changed(480px), border border-white/10 removed, shadow-xl removed, bg-white/10 removed */}
            <form
                onSubmit={handleSignup}
                className=" w-[420px] h-[540px] bg-white/10 backdrop-blur-dk rounded-2xl  p-12"
                style={{ border: "5px solid grey" }}>
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
                />
                <label
                    htmlFor="email"
                    className="block mt-8 text-white text-lg font-medium"
                    style={{ color: "white" }}>
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={userChangeListener}
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
                />

                <button
                    type="submit"
                    className="w-full mt-6 bg-white text-[#080710] py-3 rounded-md font-semibold hover:bg-gray-200"
                    style={{ color: "white" }}>
                    Submit
                </button>

                {/* <div class="flex justify-center mt-8 space-x-6">
                    <div class="flex items-center justify-center w-36 h-12 bg-white/30 rounded-md text-white cursor-pointer hover:bg-white/50">
                        <i class="fab fa-google mr-2"></i> Google
                    </div>
                    <div class="flex items-center justify-center w-36 h-12 bg-white/30 rounded-md text-white cursor-pointer hover:bg-white/50">
                        <i class="fab fa-facebook mr-2"></i> Facebook
                    </div>
                </div> */}
            </form>
        </div>
    );

}