import Navbar from "../components/Navbar";

function SignUpLogin() {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center">
                <form class="relative w-[400px] h-[520px] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl p-12">
                    <h3 class="text-3xl font-medium text-white text-center">Login Here</h3>

                    <label for="username" class="block mt-8 text-white text-lg font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Email or Phone"
                        class="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                    />

                    <label for="password" class="block mt-8 text-white text-lg font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        class="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                    />

                    <button class="w-full mt-12 bg-white text-[#080710] py-3 rounded-md font-semibold hover:bg-gray-200">
                        Log In
                    </button>

                    <div class="flex justify-center mt-8 space-x-6">
                        <div class="flex items-center justify-center w-36 h-12 bg-white/30 rounded-md text-white cursor-pointer hover:bg-white/50">
                            <i class="fab fa-google mr-2"></i> Google
                        </div>
                        <div class="flex items-center justify-center w-36 h-12 bg-white/30 rounded-md text-white cursor-pointer hover:bg-white/50">
                            <i class="fab fa-facebook mr-2"></i> Facebook
                        </div>
                    </div>
                </form>
            </div>

            {/* <div className="h-full bg-[#afafaf] text-white flex items-center justify-center flex-wrap">
                <input type="email" name="emailInput" id="emailInput" className="rounded-2xl m-2 p-2" placeholder="Email" />
                <input
                    type="password"
                    name="passwordInput"
                    id="passwordInput"
                    className="rounded-2xl m-2 p-2"
                    placeholder="Password"
                />
            </div> */}
        </>
    );
}

export default SignUpLogin;
