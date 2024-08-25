import Navbar from "../components/Navbar";
import man from "../assets/man.png";
import { useEffect, useState, useContext } from "react";
import { fetchWithAuth } from "../utilities/fetchWithAuth";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserDataCardUI from "../components/UserDataCardUI";
import Dual_Ring from "../../public/Dual_Ring.svg";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetchWithAuth(`/api/profile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
                if (status === 200) {
                    setProfile(data?.profile);
                }
            });
        console.log(profile);
    }, []);
    const handleLogout = () => {
        const showLoadingSVG = document.getElementById("loadingsvg");
        showLoadingSVG.setAttribute("src", Dual_Ring);
        showLoadingSVG.style.display="inline";
        const showLoadingSVG2 = document.getElementById("loadingsvg2");
        showLoadingSVG2.setAttribute("src", Dual_Ring);
        showLoadingSVG2.style.display="inline";

        fetchWithAuth("/api/user/logout", {
            method: "POST",
        })
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
                if (status == 200) {
                    alert(data.message);
                    setIsLoggedIn(false);
                    showLoadingSVG.style.display="none";
                    showLoadingSVG2.style.display="none";
                    navigate("/");
                } else {
                    alert(data.message);
                }
            });

            
    };

    const initialUserHistoryData = {
        bookingDate: "Loading...",
        passengerDetails: [],
        numberOfPassengers: 0,
        totalCost: 0,
        paymentStatus: "Pending"
    };

    const [userHistoryData, setUserHistoryData] = useState([
        initialUserHistoryData,
    ]);

    const fetchUserData = () => {
        // fetching method is needed to add new data to history list
        const historyList = [...userHistoryData];

        setUserHistoryData(historyList);
    }


    return (

        <>

            <Navbar />

            <div className="profiler">
                <div className="flex container justify-between container-bordershadow w-[65%] h-[80vh] items-center profile">
                    <div
                        className="w-[30%] h-[78vh] profileviewside"
                        style={{ marginInlineStart: "1%", color: "white", fontSize: "20px" }}>
                        <div className="m-[10px]">
                            <div className="flex w-[100%] items-center justify-center mt-10">
                                <img src={profile?.profilePicture || man} alt="Error" width={"80%"} height={"80%"} />
                            </div>
                            <div className="[&>*]:text-center [&>*]:mt-[20px]" style={{ wordWrap: "break-word" }}>
                                <h1 style={{ fontSize: "120%" }}>{profile?.fullName || "Full Name"}</h1>
                                <h1 style={{ fontSize: "80%" }}>{profile?.email || "example@example.com"}</h1>
                                <h1 style={{ fontSize: "80%" }}>{profile?.phone || "99999999"}</h1>
                                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <button
                                            type="submit"
                                            className="flex justify-center align-center logoutbtn container-bordershadow w-[80%] py-3 rounded-md font-semibold"
                                            onClick={handleLogout}>
                                            Logout
                                            <img id="loadingsvg" style={{display:"none"}}  alt="" width={30} height={30}/>

                                        </button>
                                    


                                </div>

                            </div>
                        </div>
                    </div>
                    <div
                        className="w-[66%] h-[78vh] orderlistside"
                        style={{ marginInlineEnd: "1%", color: "white", fontSize: "20px", }}>

                        <div
                            className="w-[30%] h-[78vh] profilemobileviewside"
                            style={{ marginInlineStart: "1%", color: "white", fontSize: "20px" }}>
                            <div className="" style={{
                                display: "flex", alignItems: "center", justifyContent: "center", width: "100%"
                            }}>

                                <div className="flex justify-around" style={{ wordWrap: "break-word", width: "inherit", marginRight: "2px", marginLeft: "2px" }}>
                                    <img src={profile?.profilePicture || man} alt="Error" width={47} height={40} />
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <h1 style={{ fontSize: "100%", textAlign: "center" }}>{profile?.fullName || "Full Name"}</h1>
                                        <h1 style={{ fontSize: "70%" }}>{profile?.email || "example@example.com"}</h1>
                                        <h1 style={{ fontSize: "70%" }}>{profile?.phone || "99999999"}</h1>
                                    </div>

                                    <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <button
                                            type="submit"
                                            className="logoutbtn container-bordershadow w-[95%] py-3 rounded-md font-semibold"
                                            onClick={handleLogout}>
                                            Logout
                                            <img id="loadingsvg2" style={{display:"none"}}  alt="" width={20} height={20}/>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div
                            className="container w-[96%] m-[2%] font-bold"
                            style={{
                                fontSize: "120%",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                            <u>Your Bookings</u>
                            <button type="button" onClick={fetchUserData}>Refresh</button>

                        </div>
                        <div className="table-column m-2 w-[96%]"
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}
                        >
                            <div>
                                Date
                            </div>
                            <div>
                                Passengers
                            </div>
                            <div>
                                Total Cost
                            </div>
                            <div>
                                Status
                            </div>

                        </div>
                        <div className="userdatas" >
                            {
                                userHistoryData.map((data, index) => (
                                    <UserDataCardUI
                                        key={index}
                                        bookingDate={data.bookingDate}
                                        passengerDetails={data.passengerDetails}
                                        numberOfPassengers={data.numberOfPassengers}
                                        totalCost={data.totalCost}
                                        paymentStatus={data.paymentStatus}
                                    />
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
