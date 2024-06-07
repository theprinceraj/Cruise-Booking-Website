import Navbar from "../components/Navbar.jsx";
import ImageCard from "../components/ImageCard.jsx";
export default function Home() {
    return (
        <>
            <div className="absolute z-[70]">
                <Navbar />
            </div>
            <div className="relative h-[89vh] w-100 flex items-center justify-center max-h-screen">
                <img
                    src="/home-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center blur-sm brightness-75 absolute l-0 t-0 z-[10]"
                />
                <div className="flex flex-wrap justify-center items-start absolute z-[50]">
                    <ImageCard
                        imageUrl={"/image2.avif"}
                        category={"FAMILY FUN"}
                        customText={"Create memories together"}
                        author={"Ankur Das"}
                    />

                    <ImageCard
                        imageUrl={"/image3.avif"}
                        category={"GOURMENT DINING"}
                        customText={"Taste the Finest"}
                        author={"Ankit Das"}
                    />

                    <ImageCard
                        imageUrl={"/image4.avif"}
                        category={"ONBOARD ENTERTAINMENT"}
                        customText={"Experience New Horizons"}
                        author={"Prince Raj"}
                    />
                </div>
            </div>
        </>
    );
}
