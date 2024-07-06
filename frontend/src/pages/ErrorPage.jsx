import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <Navbar />
            <div className="relative h-[89vh] w-100 flex flex-col items-center justify-center">
                <h1 className="text-4xl text-white font-bold text-red-500 mb-4" style={{ color: "white" }}>
                    404 - Page Not Found
                </h1>
                <p className="text-lg mb-4 text-white" style={{ color: "white" }}>
                    Sorry, the page you are looking for does not exist.
                </p>
                <button
                    className="border-solid border-2 rounded-3xl mx-2 mt-2 p-2 font-bold text-2xl bg-cyan-500 shadow-lg shadow-cyan-500/50"
                    style={{
                        borderColor: "white",
                        color: "yellow",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}>
                    <Link to="/">Go Back to Home</Link>
                </button>
            </div>
        </>
    );
}
