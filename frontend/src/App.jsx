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
        path: "/signup",
        element: <SignUpLogin isLoginForm={false} />,
    },
    {
        path: "/login",
        element: <SignUpLogin isLoginForm={true} />,
    },
]);

export default function App() {
    return (
        <>
            <div className="main-overlay"></div>
            <RouterProvider router={router} />
        </>
    );
}
