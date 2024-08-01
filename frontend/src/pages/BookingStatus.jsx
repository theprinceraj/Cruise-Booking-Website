import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
 
export default function BookingStatus() {
    const [bookingObject, setBookingObject] = useState({});
    const { token } = useParams();
 
    useEffect(() => {
        fetch(`/api/qr/verify`, {
            method: "POST",
            body: JSON.stringify({
                "token": token,
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    setBookingObject((prevBookingObject) => ({
                        ...prevBookingObject,
                        verificationStatus: false,
                        details: {
                            numberOfPassengers: "NaN",
                        },
                    }));
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
                <div className="flex items-center justify-evenly gap-10 md:gap-0  flex-wrap mt-[70px] overflow-y-scroll lg:overflow-y-auto container container-bordershadow md:w-[85%] lg:w-[65%] h-[80vh] py-5 lg:py-3">
                    <div className="flex flex-col items-center justify-between h-[90%] mt-6 lg:mt-0">
                        <div className="[&>*]:text-2xl [&>*]:lg:text-3xl [&>*]:font-extrabold">
                            {bookingObject?.verificationStatus ? (
                                <p style={{ color: "lightgreen" }}>VERIFIED BOOKING</p>
                            ) : (
                                <p style={{ color: "red" }}>NOT VERIFIED</p>
                            )}
                        </div>
                        <div>
                            {bookingObject?.verificationStatus ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-[175px] md:w-[175px] xl:w-[200px]"
                                    style={{ fill: "lightgreen", transform: "", msFilter: "" }}>
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-[175px] md:w-[175px] xl:w-[200px]"
                                    style={{ fill: "rgba(243, 18, 18, 1)", transform: "", msFilter: "" }}>
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
                                </svg>
                            )}
                        </div>
                        <div>
                            {bookingObject?.verificationStatus ? (
                                <div className="[&>*]:text-xl [&>*]:font-bold">
                                    <h3>
                                        Total Cost:{" "}
                                        <span style={{ fontWeight: 400 }}>
                                            {bookingObject?.details?.totalCost ? (
                                                <span>&#8377; {bookingObject?.details?.totalCost}</span>
                                            ) : (
                                                <span>Invalid Cost</span>
                                            )}
                                        </span>
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
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="h-[90%] flex flex-col items-center justify-between px-1">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">
                                Passenger Details{" "}
                                {bookingObject?.details?.numberOfPassengers ? (
                                    <span>({bookingObject?.details?.numberOfPassengers})</span>
                                ) : (
                                    ""
                                )}
                            </h1>
                        </div>
                        <div className="h-[85%] w-full">
                            <ul className="h-[100%] w-full px-5 overflow-y-scroll overflow-x-hidden scrollbar-css">
                                {bookingObject?.details?.passengerDetails ? (
                                    bookingObject?.details?.passengerDetails.map((passenger, index) => (
                                        <li key={passenger._id} className="pt-2">
                                            <h2 className="text-xl font-semibold">
                                                {index + 1}. Passenger {index + 1}:
                                            </h2>
                                            <h5 className="text-lg">{passenger.name}</h5>
                                            <p>Age - {passenger.age} years</p>
                                        </li>
                                    ))
                                ) : (
                                    <li key="xyz" className="pt-2">
                                        <h2 className="text-xl font-semibold">No passengers found</h2>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}