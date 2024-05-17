import { Container } from "@mui/material";
import ImageCard from "../components/ImageCard";
import Navbar from "../components/Navbar";
export default function Home() {
    return (
        <>
            <Navbar />
            <Container
                sx={{
                    backgroundColor: "rgb(0, 0, 0)",
                    m: 0,
                    p: 0,
                }}>
                <Container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        "& > *": {
                            margin: "1rem",
                        },
                    }}>
                    <ImageCard />
                    <ImageCard />
                    <ImageCard />
                </Container>
            </Container>
        </>
    );
}
