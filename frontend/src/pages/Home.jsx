import ImageCard from "../components/ImageCard.jsx";
import Navbar from "../components/Navbar.jsx";
export default function Home() {
    return (
        <>
            <Navbar />
                <ImageCard imageName="image1.jpg" />
                <ImageCard imageName="image2.avif" />
                <ImageCard imageName="image3.avif" />
        </>
    );
}
