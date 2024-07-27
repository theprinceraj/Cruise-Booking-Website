import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function VerifyEmail() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [codeExpiredOrIncorrect, setcodeExpiredOrIncorrect] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams();
    const _userId = userId.trim();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const inputVerificationCode = parseInt(e.target.verificationCode?.value);
        fetch(`/api/user/verify/${_userId}`, {
            method: "POST",
            body: JSON.stringify({
                oneTimeVerificationCode: inputVerificationCode,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
                if (status === 200) {
                    alert(data.message);
                    navigate("/login");
                } else {
                    setErrorMsg(data?.details ? `${data.message}: ${data.details}` : `${data.message}`);
                    if (data?.codeExpiredOrIncorrect) {
                        setcodeExpiredOrIncorrect(true);
                    }
                }
            });
    };
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-10 mt-[70px] overflow-y-scroll lg:overflow-y-auto container container-bordershadow w-[100%] md:w-[85%] lg:w-[65%] h-[80vh] py-5 lg:py-3">
                    <h1 className="text-2xl md:text-3xl font-bold">VERIFY YOUR EMAIL</h1>
                    <div className="flex flex-col items-center justify-evenly flex-wrap gap-4">
                        <p className="w-[80%] sm:w-[100%] text-sm text-center">
                            <i className="font-light" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                                Enter the verification code sent to your email
                            </i>
                        </p>
                        <form
                            onSubmit={handleFormSubmit}
                            className="flex flex-col items-center justify-evenly flex-wrap gap-4 md:gap-6 w-full">
                            <input
                                type="tel"
                                pattern="\d*"
                                id="verificationCode"
                                onInput={() => {
                                    if (this?.value.length > this?.maxLength)
                                        this.value = this.value.slice(0, this.maxLength);
                                }}
                                placeholder="Enter Verification Code"
                                maxLength="6"
                                minLength="6"
                                className="text-center rounded-3xl h-[50px] w-[85%]"
                                style={{ color: "black" }}></input>
                            <div className="w-[80%] min-h-[20px] text-center">
                                <i className="text-sm font-medium" style={{ color: "rgba(255, 0, 0, 1)" }}>
                                    {errorMsg}
                                </i>
                            </div>
                            <button type="submit" className="container-bordershadow w-[50%] py-2 text-center">
                                Submit
                            </button>
                            {codeExpiredOrIncorrect ? (
                                <p className="w-[80%] sm:w-[100%] text-sm">
                                    <i className="font-light" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                                        Please retry with the correct code or{" "}
                                        <u
                                            onClick={() => {
                                                navigate("/signup");
                                            }}>
                                            tap here
                                        </u>{" "}
                                        to signup again and a get new code.
                                    </i>
                                </p>
                            ) : (
                                ""
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
