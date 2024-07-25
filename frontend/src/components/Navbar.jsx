import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkIsLoggedIn } from "../utilities/checkIsLoggedIn.js";
export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(checkIsLoggedIn());
        console.log(checkIsLoggedIn());
    }, []);
    return (
        <>
            <nav
                className="backdrop-blur-dk fixed w-full z-10 top-0 left-0 shadow-md"
                style={{ color: "white", display: "block" }}>
                <div className="flex items-center justify-between h-16 border-b border-gray-700">
                    <div className="w-40 m-2 font-bold text-2xl">
                        <Link to="/">Lenin Cruise</Link>
                    </div>
                    <div className="flex items-center m-3">
                        <Link to="/" className="px-4 sm:px-6 font-bold p-2 border-e-2">
                            HOME
                        </Link>
                        <Link to="/bookings" className="px-4 sm:px-6 border-e-2 font-bold p-2">
                            BUY NOW
                        </Link>
                        {isLoggedIn ? (
                            ""
                        ) : (
                            <>
                                <Link to="/signup" className="px-4 sm:px-6 font-bold p-2 border-e-2">
                                    SIGN UP
                                </Link>
                                <Link to="/login" className="px-4 sm:px-6 font-bold p-2">
                                    LOG IN
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            ;
        </>
    );
}
