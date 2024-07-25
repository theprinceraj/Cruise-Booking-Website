import Navbar from "../components/Navbar.jsx";
import ImageCard from "../components/ImageCard.jsx";
import { Link } from "react-router-dom";
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
            <div>
                <Navbar />
            </div>
            <div className="relative h-[89vh] w-100 flex flex-col items-center justify-center">
                <div className="flex flex-wrap justify-center items-start">
                    {imageCardsData.map((data, index) => (
                        <ImageCard
                            key={index}
                            imageUrl={data.imageUrl}
                            category={data.category}
                            customText={data.customText}
                            author={data.author}
                        />
                    ))}
                </div>
                <button
                    className="border-solid border-2 rounded-3xl mx-2 mt-2 p-2 font-bold text-2xl"
                    style={{
                        borderColor: isHovered ? "white" : "cyan",
                        color: isHovered ? "white" : "cyan",
                        backgroundColor: isHovered ? "rgb(0, 202, 180, 0.85)" : "rgba(0, 0, 0, 0.35)",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <Link to="/booking">BOOK NOW</Link>
                </button>
            </div>
        </>
    );
}
