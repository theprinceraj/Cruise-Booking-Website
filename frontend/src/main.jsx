import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Booking from "./pages/booking.jsx";
import Navbar from "./components/Navbar.jsx";
import Contacts from "./pages/Contacts";

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
        path: "/contacts",
        element: <Contacts />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Navbar />
        <RouterProvider router={router} />
    </React.StrictMode>
);
