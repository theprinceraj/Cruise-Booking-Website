import Nav from "react-bootstrap/Nav";
export default function Navbar() {
    return (
        <>
            <Nav activeKey="/home" onSelect={(selectedKey) => alert(`Selected ${selectedKey}`)}>
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/home">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/home">Link</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}
