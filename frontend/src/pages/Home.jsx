import Container from "react-bootstrap/esm/Container.js";
import ImageCard from "../components/ImageCard.jsx";
import Navbar from "../components/Navbar.jsx";
export default function Home() {
    return (
        <>
            <Navbar />
            <Container>
                <ImageCard imageName="image1.jpg" />
                <ImageCard imageName="image2.avif" />
                <ImageCard imageName="image3.avif" />
            </Container>
        </>
    );
}
