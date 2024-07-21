import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "./pages/Home.jsx";
import Bookings from "./pages/Bookings.jsx";
import Contact from "./pages/Contact";
import SignUpLogin from "./pages/SignUpLogin.jsx";
import Profile from "./pages/Profile.jsx";
import BookingStatus from "./pages/BookingStatus.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/bookings",
        element: <Bookings />,
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
        path: "/booking-status",
        element: <BookingStatus />,
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
