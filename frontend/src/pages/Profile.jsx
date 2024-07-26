import Navbar from "../components/Navbar";
import man from "../assets/man.png";
import { useEffect } from "react";
import { fetchWithAuth } from "../utilities/fetchWithAuth";
import { getCookie } from "../utilities/checkIsLoggedIn";
export default function Profile() {
    useEffect(() => {
        fetchWithAuth(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/profile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
                console.log(status, data);
            });
    }, []);
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center mt-[60px]">
                <div className="flex container justify-between container-bordershadow w-[65%] h-[80vh] items-center">
                    {" "}
                    <div
                        className="w-[30%] h-[78vh]"
                        style={{ marginInlineStart: "1%", color: "white", fontSize: "20px" }}>
                        <div className="m-[10px]">
                            <div className="flex w-[100%] items-center justify-center mt-10">
                                <img src={man} alt="Error" width={"80%"} height={"80%"} />
                            </div>
                            <div className="[&>*]:text-center [&>*]:mt-[30px]" style={{ wordWrap: "break-word" }}>
                                <h1 style={{ fontSize: "120%" }}>Username</h1>
                                <h1 style={{ fontSize: "80%" }}>Email</h1>
                                <h1 style={{ fontSize: "80%" }}>Phone</h1>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-[66%] h-[78vh]"
                        style={{ marginInlineEnd: "1%", color: "white", fontSize: "20px" }}>
                        <div
                            className="container w-[96%] m-[2%] font-bold"
                            style={{
                                fontSize: "120%",
                                color: "white",
                            }}>
                            <u>Cruise Booking Details</u>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
