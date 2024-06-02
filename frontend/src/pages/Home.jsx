import Carousel from "../components/Carousel.jsx";
import Navbar from "../components/Navbar.jsx";
export default function Home() {
    return (
        <>
            <Navbar />
            <div className="object-center object-cover h-[90vh] w-100 brightness-75 overflow-hidden">
                <img src="/home-bg.jpg" alt="home bg"/>
            </div>
        </>
    );
}
