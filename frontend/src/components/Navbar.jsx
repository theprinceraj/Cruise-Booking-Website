import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
export default function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <>
            <nav
                className="backdrop-blur-dk fixed w-full z-10 top-0 left-0 shadow-md"
                style={{ color: "white", display: "block" }}>
                <div className="flex items-center justify-between h-16 border-b border-gray-700">
                    <div className="w-40 m-2 font-bold text-2xl">
                        <Link to="/">Lenin Cruise</Link>
                    </div>
                    <div className="flex items-center justify-evenly m-3 [&>*]:font-bold [&>*]:p-2 [&>*]:sm:px-6">
                        <Link to="/" className=" border-e-2">
                            HOME
                        </Link>
                        <Link to="/booking" className=" border-e-2">
                            BUY NOW
                        </Link>
                        {isLoggedIn ? (
                            <Link to="/profile" className=" ">
                                PROFILE
                            </Link>
                        ) : (
                            <>
                                <Link to="/signup" className=" border-e-2">
                                    SIGN UP
                                </Link>
                                <Link to="/login" className="">
                                    LOG IN
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
