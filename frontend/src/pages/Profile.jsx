import Navbar from "../components/Navbar";
import man from "../assets/man.png";
import { useEffect, useState, useContext } from "react";
import { fetchWithAuth } from "../utilities/fetchWithAuth";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
        fetchWithAuth("/api/user/logout", {
            method: "POST",
        })
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
                if (status == 200) {
                    alert(data.message);
                    setIsLoggedIn(false);
                    navigate("/");
                } else {
                    alert(data.message);
                }
            });
    };
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center mt-[60px]">
                <div className="flex container justify-between container-bordershadow w-[65%] h-[80vh] items-center">
                    <div
                        className="w-[30%] h-[78vh]"
                        style={{ marginInlineStart: "1%", color: "white", fontSize: "20px" }}>
                        <div className="m-[10px]">
                            <div className="flex w-[100%] items-center justify-center mt-10">
                                <img src={profile?.profilePicture || man} alt="Error" width={"80%"} height={"80%"} />
                            </div>
                            <div className="[&>*]:text-center [&>*]:mt-[30px]" style={{ wordWrap: "break-word" }}>
                                <h1 style={{ fontSize: "120%" }}>{profile?.fullName || "Full Name"}</h1>
                                <h1 style={{ fontSize: "80%" }}>{profile?.email || "example@example.com"}</h1>
                                <h1 style={{ fontSize: "80%" }}>{profile?.phone || "99999999"}</h1>
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
                            <u>Your Bookings</u>
                        </div>
                        <button
                            type="submit"
                            className="container-bordershadow w-full mt-8 py-3 rounded-md font-semibold"
                            onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
