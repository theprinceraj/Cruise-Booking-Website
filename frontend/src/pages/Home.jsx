import Navbar from "../components/Navbar.jsx";
export default function Home() {
    return (
        <>
            <Navbar />
            <div className="relative object-center object-cover h-[89vh] w-100 overflow-scroll bg-[url('/home-bg.jpg')]  bg-cover bg-center flex items-center justify-center max-h-screen">
                <div className="flex flex-wrap justify-center items-start">
                    <div
                        className="relative !bg-white w-80 m-3 shadow-lg transition-transform transform hover:scale-105">
                        <div
                            className="bg-cover bg-center h-52"
                            style={{ backgroundImage: "url('/image2.avif')" }}></div>
                        <a
                            href="#"
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent hover:to-black/60 transition-all duration-350"></a>
                        <div className="p-4 relative">
                            <div className="flex justify-between items-center mb-3">
                                <a className="bg-green-500 text-white text-xs uppercase px-2 py-1">News</a>
                                <div className="text-sm text-gray-500">6/11/2018</div>
                            </div>
                            <h1 className="text-xl mb-2">There have been big Tesla accident at New Jersey</h1>
                            <div className="text-gray-600">
                                by{" "}
                                <a href="#" className="underline">
                                    Sardorbek Usmonov
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative !bg-white w-80 m-3 shadow-lg transition-transform transform hover:scale-105">
                        <div
                            className="bg-cover bg-center h-52"
                            style={{ backgroundImage: "url('image3.avif')" }}></div>
                        <a
                            href="#"
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent hover:to-black/60 transition-all duration-350"></a>
                        <div className="p-4 relative">
                            <div className="flex justify-between items-center mb-3">
                                <a className="bg-gray-600 text-white text-xs uppercase px-2 py-1">Tech</a>
                                <div className="text-sm text-gray-500">6/07/2018</div>
                            </div>
                            <h1 className="text-xl mb-2">Samsung laptops is exploding again</h1>
                            <div className="text-gray-600">
                                by{" "}
                                <a href="#" className="underline">
                                    Tyler Platt
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative !bg-white w-80 m-3 shadow-lg transition-transform transform hover:scale-105">
                        <div
                            className="bg-cover bg-center h-52"
                            style={{ backgroundImage: "url('image4.avif')" }}></div>
                        <a
                            href="#"
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent hover:to-black/60 transition-all duration-350"></a>
                        <div className="p-4 relative">
                            <div className="flex justify-between items-center mb-3">
                                <a className="bg-yellow-500 text-white text-xs uppercase px-2 py-1">Deals</a>
                                <div className="text-sm text-gray-500">5/27/2018</div>
                            </div>
                            <h1 className="text-xl mb-2">Apple is having big Sale for the first time</h1>
                            <div className="text-gray-600">
                                by{" "}
                                <a href="#" className="underline">
                                    Prince Raj
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
