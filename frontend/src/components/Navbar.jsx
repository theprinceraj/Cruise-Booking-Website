import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Navbar.css";

export default function CustomNavbar() {
    return (
        <Navbar expand="lg" className="nav-bg">
            <Container>
                <Row className="w-100">
                    <Col xs={12} lg={6} className="d-flex align-items-center">
                        <Navbar.Brand href="/" >Lenin Cruise</Navbar.Brand>
                    </Col>
                    <Col xs={12} lg={6} className="d-flex justify-content-end">
                        <Nav onSelect={(selectedKey) => alert(`Selected ${selectedKey}`)}>
                            <Nav.Item>
                                <Nav.Link href="/">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/">Link</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/">Link</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}
