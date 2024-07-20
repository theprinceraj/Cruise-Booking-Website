import { useState } from "react";
import Navbar from "../components/Navbar";

export default function BookingStatus() {
    const [isVerifiedBooking, setIsVerifiedBooking] = useState(false);
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center mt-[70px] container container-bordershadow w-[65%] h-[80vh]">
                    <div>{isVerifiedBooking ? "VERIFIED BOOKING" : "NOT VERIFIED"}</div>
                    <div>
                        <h1 style={{ color: "white" }}>Passenger Details</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
