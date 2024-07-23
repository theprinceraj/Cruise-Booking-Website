import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "./pages/Home.jsx";
import Bookings from "./pages/Bookings.jsx";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile.jsx";
import BookingStatus from "./pages/BookingStatus.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import SignUp from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
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
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/booking-status/:token",
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
