import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { removeToken } from "@/lib/authenticate"; // Import the removeToken function

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false); // Added state for the mobile menu
  const router = useRouter();
  const token = readToken(); // Assuming you have already defined the readToken function

  // Function to handle logout
  function logout() {
    setIsExpanded(false);
    removeToken(); // Call the removeToken function to clear the token from local storage
    router.push('/login'); // Redirect to the login page after logout
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Dhenu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(e => !e)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref><Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link></Link>
            </Nav>
            {token ? ( // Check if the user is logged in (has token)
              <>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchField} onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button type="submit" variant="success">Search</Button>
                </Form>
                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref><NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item></Link>
                    <Link href="/history" passHref><NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item></Link>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item> {/* Logout item */}
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              // If not logged in, show Register and Login links
              <Nav>
                <Link href="/register" passHref><Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link></Link>
                <Link href="/login" passHref><Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link></Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br /><br />
    </>
  );
}
