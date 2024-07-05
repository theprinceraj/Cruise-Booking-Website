import Navbar from "../components/Navbar";

function SignUpLogin({ isLoginForm }) {
    const handleSignup = () => {};
    const handleLogin = () => {};

    return (
        <>
            <Navbar />
            {isLoginForm ? (
                <div className="flex items-center justify-center" style={{ marginTop: 60 }}>
                    {/* form changes -> relative removed, height changed(480px), border border-white/10 removed, shadow-xl removed, bg-white/10 removed */}
                    <form
                        class=" w-[400px] h-[480px]  backdrop-blur-dk rounded-2xl p-12"
                        style={{ border: "5px solid grey" }}>
                        <h3
                            class="text-3xl font-medium text-white text-center"
                            style={{
                                color: "white",
                            }}>
                            Login
                        </h3>

                        <label
                            for="username"
                            class="block mt-8 text-white text-lg font-medium"
                            style={{ color: "white" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            style={{ backgroundColor: "lightcyan" }}
                            id="username"
                            placeholder="Email or Phone"
                            class="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                        />

                        <label
                            for="password"
                            class="block mt-8 text-white text-lg font-medium"
                            style={{ color: "white" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            style={{ backgroundColor: "lightcyan" }}
                            placeholder="Password"
                            class="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                        />

                        <button
                            class="w-full mt-12 bg-white text-[#080710] py-3 rounded-md font-semibold hover:bg-gray-200"
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
            ) : (
                <div className="flex items-center justify-center" style={{ marginTop: 60 }}>
                    {/* form changes -> relative removed, height changed(480px), border border-white/10 removed, shadow-xl removed, bg-white/10 removed */}
                    <form
                        class=" w-[400px] h-[480px] bg-white/10 backdrop-blur-dk rounded-2xl  p-12"
                        style={{ border: "5px solid grey" }}>
                        <h3 class="text-3xl font-medium text-white text-center" style={{ color: "white" }}>
                            Signup
                        </h3>

                        <label
                            for="username"
                            class="block mt-8 text-white text-lg font-medium"
                            style={{ color: "white" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Email or Phone"
                            class="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                            style={{ backgroundColor: "lightcyan" }}
                        />

                        <label
                            for="password"
                            class="block mt-8 text-white text-lg font-medium"
                            style={{ color: "white" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            style={{ backgroundColor: "lightcyan" }}
                            placeholder="Password"
                            class="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                        />

                        <button
                            class="w-full mt-12 bg-white text-[#080710] py-3 rounded-md font-semibold hover:bg-gray-200"
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
            )}
        </>
    );
}

export default SignUpLogin;
