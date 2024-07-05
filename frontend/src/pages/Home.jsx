import Navbar from "../components/Navbar.jsx";
import ImageCard from "../components/ImageCard.jsx";
import { useState } from "react";
export default function Home() {
    const [imageCardsData, setImageCardsData] = useState([
        {
            imageUrl: "/image2.avif",
            category: "FAMILY FUN",
            customText: "Create memories together",
            author: "Ankur Das",
        },
        {
            imageUrl: "/image3.avif",
            category: "GOURMENT DINING",
            customText: "Taste the Finest",
            author: "Ankit Das",
        },
        {
            imageUrl: "/image4.avif",
            category: "ONBOARD ENTERTAINMENT",
            customText: "Experience New Horizons",
            author: "Prince Raj",
        },
    ]);

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <>
            <Navbar />
            <div className="relative h-[89vh] w-100 flex flex-col items-center justify-center">
                <div className="flex flex-wrap justify-center items-start">
                    {imageCardsData.map((data) => (
                        <ImageCard
                            imageUrl={data.imageUrl}
                            category={data.category}
                            customText={data.customText}
                            author={data.author}
                        />
                    ))}
                </div>
                <button
                    className="border-solid border-2 rounded-3xl mx-2 mt-2 p-2 font-bold text-2xl bg-cyan-500 shadow-lg shadow-cyan-500/50"
                    style={{
                        borderColor: "white",
                        color: isHovered ? "white" : "yellow",
                        backgroundColor: isHovered ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                        <a href="/booking">BOOK NOW</a>
                    
                </button>
            </div>
        </>
    );
}
