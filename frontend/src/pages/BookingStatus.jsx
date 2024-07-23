import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function BookingStatus() {
    const [bookingObject, setBookingObject] = useState({});
    const { token } = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.BACKEND_VERIFICATION_BASE_URL}/`, {
            method: "POST",
            body: JSON.stringify({
                "token": token,
            }),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
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
    }, []);

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-evenly gap-10 lg:gap-0  flex-wrap mt-[70px] overflow-y-scroll lg:overflow-y-auto container container-bordershadow md:w-[75%] lg:w-[65%] h-[80vh] py-5 lg:py-3">
                    <div className="flex flex-col items-center justify-between h-[90%] mt-6 lg:mt-0">
                        <div className="[&>*]:text-2xl [&>*]:lg:text-3xl [&>*]:font-extrabold">
                            {bookingObject?.verificationStatus ? (
                                <p style={{ color: "lightgreen" }}>VERIFIED BOOKING</p>
                            ) : (
                                <p style={{ color: "red" }}>NOT VERIFIED</p>
                            )}
                        </div>
                        <div>
                            {bookingObject?.details?.qrData ? (
                                <img
                                    src={bookingObject.details.qrData}
                                    alt="qrCode"
                                    className="rounded-xl border-2 border-solid w-[175px] md:w-[150px] xl:w-[200px]"
                                    style={{ borderColor: "cyan" }}
                                />
                            ) : (
                                <img src="" alt="Failed to fetch QR code" />
                            )}
                        </div>
                        <div>
                            <div className="[&>*]:text-xl [&>*]:font-bold">
                                <h3>
                                    Total Cost:{" "}
                                    <span style={{ fontWeight: 400 }}>&#8377; {bookingObject?.details?.totalCost}</span>
                                </h3>
                                <h3>
                                    Cruise Date:{" "}
                                    <span style={{ fontWeight: 400 }}>
                                        {new Date(bookingObject?.details?.cruiseDate).toLocaleDateString()}
                                    </span>
                                </h3>
                                <h3>
                                    Booked On:{" "}
                                    <span style={{ fontWeight: 400 }}>
                                        {new Date(bookingObject?.details?.bookingDate).toLocaleDateString()}
                                    </span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="h-[90%] flex flex-col items-center justify-between px-1">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">
                                Passenger Details ({bookingObject?.details?.numberOfPassengers})
                            </h1>
                        </div>
                        <div className="h-[85%] w-full">
                            <ul className="h-[100%] w-full overflow-y-scroll overflow-x-hidden scrollbar-css">
                                {bookingObject?.details?.passengerDetails.map((passenger, index) => (
                                    <li key={passenger._id} className="pt-2">
                                        <h2 className="text-xl font-semibold">
                                            {index + 1}. Passenger {index + 1}:
                                        </h2>
                                        <h5 className="text-lg">{passenger.name}</h5>
                                        <p>Age - {passenger.age} years</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
