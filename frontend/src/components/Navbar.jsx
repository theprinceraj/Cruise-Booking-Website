import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
export default function CollapsibleNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="#fafafa">
            <Container>
                <Navbar.Brand href="#home">Lenin Cruise</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav.Item></Nav.Item>
                    <Nav>
                        <Nav.Link href="">
                            <Link to={"/"}>Home</Link>
                        </Nav.Link>
                        <Nav.Link href="">
                            <Link to={"/contact"}>Contact</Link>
                        </Nav.Link>
                        <Nav.Link href="">
                            <Link to={"/booking"}>Book Now</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
