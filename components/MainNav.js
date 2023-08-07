// components/MainNav.js

import { Container, Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { removeToken, readToken, isAuthenticated } from '@/lib/authenticate'; // Import the removeToken, readToken, and isAuthenticated functions

export default function MainNav(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const token = readToken();

  // Function to handle logout
  function logout() {
    setIsExpanded(false);
    removeToken();
    
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Dhenu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(e => !e)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            </Nav>

            {token ? (
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" variant="success">Search</Button>
              </Form>
            ) : (
              <Nav>
                <Link href="pages/register" passHref><Nav.Link active={router.pathname === "pages/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link></Link>
                <Link href="/login" passHref><Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link></Link>
              </Nav>
            )}

            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  {isAuthenticated() && <Link href="/favourites" passHref><NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item></Link>}
                  {isAuthenticated() && <Link href="/history" passHref><NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item></Link>}
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br /><br />
    </>
  );
}
