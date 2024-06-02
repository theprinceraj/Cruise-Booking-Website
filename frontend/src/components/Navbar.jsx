import { Link } from "react-router-dom";
import buyLogo from "/buyLogo.svg";
import homeLogo from "/homeLogo.svg";
export default function Navbar() {
    return (
        <div className="flex items-center justify-between bg-[#fafafa] border-b-1 h-15 shadow-black">
            <div className="w-40 m-2 font-bold text-2xl">Lenin Cruise</div>
            <div className="flex items-center m-3">
                <Link to="/" className="px-10 border-e-2">
                    <img src={homeLogo} alt="Go back to homepage" width={40} />
                </Link>
                <Link to="/booking" className="px-10 border-e-2">
                    <img src={buyLogo} alt="Book Now" width={40} />
                </Link>
                <Link to="/authorization" className="px-10 font-bold p-2 border-e-2">
                    REGISTER
                </Link>
                <Link to="/authorization" className="px-10 font-bold p-2">
                    LOG IN
                </Link>
            </div>
        </div>
    );
}
