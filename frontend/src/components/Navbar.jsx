import { Link } from "react-router-dom";
import buyLogo from "/buyLogo.svg";
import homeLogo from "/homeLogo.svg";
export default function CollapsibleNavbar() {
    return (
        <div className="flex items-center justify-between bg-[#fafafa]">
            <div className="w-40 m-2 font-bold text-2xl">Lenin Cruise</div>
            <div className="flex items-center gap-1">
                <Link to="/">
                    <img src={homeLogo} alt="Go back to homepage" width={50} />
                </Link>
                <Link to="/booking">
                    <img src={buyLogo} alt="Book Now" width={50} />
                </Link>
                <Link to="/contact">REGISTER</Link>
                <Link to="/authorization">LOGIN</Link>
            </div>
        </div>
    );
}
