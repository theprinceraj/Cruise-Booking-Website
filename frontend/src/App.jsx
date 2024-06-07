import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact";
import SignUpLogin from "./pages/SignUpLogin.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/booking",
        element: <Booking />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/authorization",
        element: <SignUpLogin />,
    },
]);

export default function App() {
    return (
        <>
            <div className="main-overlay">
                <RouterProvider router={router} />
            </div>
        </>
    );
}
