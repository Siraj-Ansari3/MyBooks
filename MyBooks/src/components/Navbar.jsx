import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MyNavbar = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">MyBooks</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/book/list">List Book</Nav.Link>
                            <Nav.Link href="/book/orders">Orders</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Signin</Nav.Link>
                            <Nav.Link href="/register">Signup</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default MyNavbar
