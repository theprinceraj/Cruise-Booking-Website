import { Link } from "react-router-dom";
import buyLogo from "/buyLogo.svg";
import homeLogo from "/homeLogo.svg";

const navInlineCSS = {
    color: "white",
};
export default function Navbar() {
    return (
        <>
            <nav
                className="bg-black/80 backdrop-blur-lg fixed w-full z-10 top-0 left-0 shadow-md"
                style={navInlineCSS}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 border-b border-gray-700">
                        <div className="w-40 m-2 font-bold text-2xl">Lenin Cruise</div>
                        <div className="flex items-center m-3">
                            <Link to="/" className="px-4 sm:px-6 border-e-2 border-gray-700 hover:text-gray-300">
                                <img src={homeLogo} alt="Go back to homepage" width="40" />
                            </Link>
                            <Link to="/booking" className="px-4 sm:px-6 border-e-2 border-gray-700 hover:text-gray-300">
                                <img src={buyLogo} alt="Book Now" width="40" />
                            </Link>
                            <Link
                                to="/authorization"
                                className="px-4 sm:px-6 font-bold p-2 border-e-2 border-gray-700 hover:text-gray-300">
                                REGISTER
                            </Link>
                            <Link to="/authorization" className="px-4 sm:px-6 font-bold p-2 hover:text-gray-300">
                                LOG IN
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            );
        </>
    );
}
