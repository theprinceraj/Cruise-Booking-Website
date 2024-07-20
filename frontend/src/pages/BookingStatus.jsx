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
                <div className="flex items-center justify-evenly mt-[70px] container container-bordershadow w-[65%] h-[80vh]">
                    <div>{isVerifiedBooking ? "VERIFIED BOOKING" : "NOT VERIFIED"}</div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <div>
                            <h1 className="text-3xl" style={{ color: "white", fontWeight: 700 }}>Passenger Details</h1>
                        </div>
                        <ul>
                            <li>
                                <h5 className="text-lg">Ankit Das</h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
