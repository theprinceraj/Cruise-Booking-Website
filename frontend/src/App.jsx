import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact";
import SignUpLogin from "./pages/SignUpLogin.jsx";
import Profile from "./pages/Profile.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));

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
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorPage />
            </Suspense>
        ),
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
