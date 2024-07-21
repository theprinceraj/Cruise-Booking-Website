import React from "react";
import Navbar from "./Navbar";
import man from "../assets/man.png";

function DashBoard() {
    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className="flex items-center justify-center " style={{ marginTop: "60px" }}>
                <div
                    className="flex container container-bordershadow w-[65%] h-[80vh] items-center"
                    style={{ justifyContent: "space-between" }}>
                    <div
                        className=" second-container w-[30%] h-[78vh]"
                        style={{ marginInlineStart: "1%", color: "white", fontSize: "20px" }}>
                        <div style={{ margin: "10px" }}>
                            <div className="flex w-[100%] items-center justify-center mt-10">
                                <img src={man} alt="Error" width={"80%"} height={"80%"} />
                            </div>
                            <div style={{ wordWrap: "break-word" }}>
                                <h1 style={{ textAlign: "center", marginTop: "30px", fontSize: "120%" }}>Username</h1>
                                <h1 style={{ textAlign: "center", marginTop: "30px", fontSize: "80%" }}>Email</h1>
                                <h1 style={{ textAlign: "center", marginTop: "30px", fontSize: "80%" }}>Phone</h1>
                            </div>
                        </div>
                    </div>
                    <div
                        className=" second-container w-[66%] h-[78vh]"
                        style={{ marginInlineEnd: "1%", color: "white", fontSize: "20px" }}>
                        <div
                            className=" container w-[96%]"
                            style={{
                                fontFamily: "fantasy",
                                fontSize: "120%",
                                margin: "2%",
                                color: "white",
                                textDecorationLine: "underline",
                            }}>
                            Cruise Booking Details
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;
