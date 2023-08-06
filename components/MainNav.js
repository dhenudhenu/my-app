import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from '@/lib/userData';
import { removeToken } from '@/lib/authenticate'; // Import the removeToken function

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); // Added state for the mobile menu

  async function submitForm(event) {
    event.preventDefault();
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/search?q=${searchField}`);
  }

  function logout() {
    setIsExpanded(false); // Collapse the menu
    removeToken(); // Remove the token from local storage
    router.push('/login'); // Redirect to the login page
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Dhenu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(e => !e)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/index" passHref><Nav.Link active={router.pathname === "/index"} onClick={() => setIsExpanded(false)}>Home</Nav.Link></Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField} onChange={(e) => setSearchField(e.target.value)}
              />
            </Form>
            &nbsp;
            <Nav>
            <Link href="/login" passHref><Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>login</Nav.Link></Link>
            <Link href="/register" passHref><Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>register</Nav.Link></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br /><br />
    </>
  );
}
