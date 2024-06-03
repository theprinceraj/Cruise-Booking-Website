import Navbar from "../components/Navbar.jsx";
import ImageCard from "../components/ImageCard.jsx";
export default function Home() {
    return (
        <>
            <div className="relative z-[70]">
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
                        category={"BOOK NOW"}
                        customText={"There have been big Tesla accident at New Jersey"}
                        author={"Ankur Das"}
                    />

                    <ImageCard
                        imageUrl={"/image3.avif"}
                        category={"HURRY UP"}
                        customText={"Samsung laptops is exploding again"}
                        author={"Ankit Das"}
                    />

                    <ImageCard
                        imageUrl={"/image4.avif"}
                        category={"TIME IS RUNNING OUT"}
                        customText={"Apple is having big Sale for the first time"}
                        author={"Prince Raj"}
                    />
                </div>
            </div>
        </>
    );
}
