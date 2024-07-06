import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const initialUserValues = {
        email:"",
        password:"",
    };
    
    const navigate = useNavigate();
    const URL = "http://localhost:5000/login" ;
    const [user, setUser] = useState(initialUserValues);

    const userChangeListener=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]:value,
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(URL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user)
            });
    
            if(response.ok){
                navigate("/");
            }
            else{
                alert("Invalid Email or Password");
            }
    
            console.log(response);
        }

        catch(error){
                console.log("register",error);
        }

    };
    return (
        <div className="flex items-center justify-center" style={{ marginTop: 60 }}>
            {/* form changes -> relative removed, height changed(480px), border border-white/10 removed, shadow-xl removed, bg-white/10 removed */}
            <form
                onSubmit={handleLogin}
                className=" w-[420px] h-[440px]  backdrop-blur-dk rounded-2xl p-12"
                style={{ border: "5px solid grey" }}>
                <h3
                    className="text-3xl font-medium text-white text-center"
                    style={{
                        color: "white",
                    }}>
                    Login
                </h3>

                <label
                    htmlFor="email"
                    className="block mt-8 text-white text-lg font-medium"
                    style={{ color: "white" }}>
                    Email
                </label>
                <input
                    type="text"
                    style={{ backgroundColor: "lightcyan" }}
                    id="email"
                    placeholder="Enter Email"
                    name="email"
                    value={user.email}
                    onChange={userChangeListener}
                    className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                />

                <label
                    htmlFor="password"
                    className="block mt-8 text-white text-lg font-medium"
                    style={{ color: "white" }}>
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    style={{ backgroundColor: "lightcyan" }}
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={userChangeListener}
                    className="w-full h-12 mt-2 bg-white/10 rounded-md px-3 text-white placeholder-gray-300 focus:outline-none"
                />

                <button
                    type="submit"
                    className="w-full mt-8 bg-white text-[#080710] py-3 rounded-md font-semibold hover:bg-gray-200"
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