// import Nav from "react-bootstrap/Nav";
// import "../styles/Navbar.css";
// export default function Navbar() {
//     return (
//         <>
//             <Nav
//                 onSelect={(selectedKey) => alert(`Selected ${selectedKey}`)}
//                 className="justify-content-end nav-bg">
//                 <Nav.Item className="nav-link">
//                     <Nav.Link href="/home">Active</Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item className="nav-link">
//                     <Nav.Link href="/home">Link</Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item className="nav-link">
//                     <Nav.Link href="/home">Link</Nav.Link>
//                 </Nav.Item>
//             </Nav>
//         </>
//     );
// }
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Navbar.css";

export default function CustomNavbar() {
    return (
        <Navbar expand="lg" className="nav-bg" style={{background:"black"}}>
            <Container>
                <Row className="w-100">
                    <Col xs={12} lg={6} className="d-flex align-items-center">
                        <Navbar.Brand href="/" style={{color:"red"}}>Lenin Cruise</Navbar.Brand>
                    </Col>
                    <Col xs={12} lg={6} className="d-flex justify-content-end">
                        <Nav onSelect={(selectedKey) => alert(`Selected ${selectedKey}`)}>
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/booking">Book</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contacts">Contact</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}
