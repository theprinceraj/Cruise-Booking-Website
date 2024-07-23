import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function VerifyEmail() {
    const { userId } = useParams();
    const handleFormSubmit = (e) => {};
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-10 flex-wrap mt-[70px] overflow-y-scroll lg:overflow-y-auto container container-bordershadow w-[100%] md:w-[85%] lg:w-[65%] h-[80vh] py-5 lg:py-3">
                    <h1 className="text-2xl md:text-3xl font-bold">VERIFY YOUR EMAIL</h1>
                    <div className="flex flex-col items-center justify-evenly flex-wrap gap-4">
                        <p className="w-[80%] sm:w-[100%] text-sm">
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
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                placeholder="Enter Verification Code"
                                maxlength="6"
                                minlength="6"
                                class="text-center rounded-3xl h-[50px] w-[85%]"
                                style={{ color: "black" }}></input>
                            <button type="submit" className="container-bordershadow w-[50%] py-2 text-center">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
