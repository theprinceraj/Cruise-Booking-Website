
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// export default function BookingStatus() {
//     const [isVerifiedBooking, setIsVerifiedBooking] = useState(false);

//     const url = "";


export default function BookingStatus() {
    const [bookingObject, setBookingObject] = useState({});

    const URL = "http://localhost:3000/api/qr/verify/";
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
        "token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib29raW5nSWQiOiI2NjljOWZhMjUzZGE3ODdmMjIyNjQwM2IiLCJ1c2VySWQiOiI2NjljOWY5NTUzZGE3ODdmMjIyNjNmNWEiLCJpYXQiOjE3MjE1NDA1MTR9.3wqtVunIEpWreC3VOvBdZYRTl78848UUgoCPMEelZdo",
    });

    fetch(URL, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                setIsVerifiedBooking(false);
                console.log("Failed to verify booking");
            }
        })
        .then((data) => {
            setBookingObject(data);
            console.log(data);
        })
        .catch((error) => console.log(error));


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-evenly mt-[70px] container container-bordershadow w-[65%] h-[80vh]">

                    <div>{isVerifiedBooking ? "VERIFIED BOOKING" : "NOT VERIFIED"}</div>

                    <div
                        className="h-[90%]"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <div>
                            {bookingObject.verificationStatus ? (
                                <p className="text-xl" style={{ color: "lightgreen", fontWeight: 800 }}>
                                    VERIFIED BOOKING
                                </p>
                            ) : (
                                <p className="text-xl" style={{ color: "red", fontWeight: 800 }}>
                                    NOT VERIFIED
                                </p>
                            )}
                        </div>
                        <div>
                            {bookingObject?.details?.qrData ? (
                                <img
                                    src={bookingObject.details.qrData}
                                    alt="qrCode"
                                    width={150}
                                    className="rounded-xl"
                                    style={{ border: "2px solid cyan" }}
                                />
                            ) : (
                                <img src="" alt="Failed to fetch QR code" />
                            )}
                        </div>
                        <div></div>
                    </div>

                    <div
                        className="h-[90%]"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <div>
                            <h1 className="text-3xl" style={{ fontWeight: 700 }}>
                                Passenger Details
                            </h1>
                        </div>
                        <ul className="h-[80%] w-full">

                            <li>
                                <h2 className="text-xl" style={{ fontWeight: 600 }}>
                                    1. Passenger 1:
                                </h2>
                                <h5 className="text-lg">Ankit Das</h5>
                                <p>Age - 22 years</p>
                            </li>

                            <ul className="h-[90%] w-full overflow-y-scroll overflow-x-hidden scrollbar-css">
                                {bookingObject?.details?.passengerDetails.map((passenger, index) => (
                                    <li key={passenger._id} className="py-2">
                                        <h2 className="text-xl" style={{ fontWeight: 600 }}>
                                            {index + 1}. Passenger {index + 1}:
                                        </h2>
                                        <h5 className="text-lg">{passenger.name}</h5>
                                        <p>Age - {passenger.age} years</p>
                                    </li>
                                ))}
                            </ul>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

