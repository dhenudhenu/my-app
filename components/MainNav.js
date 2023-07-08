import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MainNav = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchField = e.target.search.value;
    
    if (searchField.trim() !== '') {
      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchValue('');
    }
  };
  
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };


  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary">
        <Container>
          <Navbar.Brand>Harmandeep Singh Sidhu</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
  <FormControl
    type="text"
    placeholder="Search"
    name="search"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    className="me-2"
    autoComplete="off"
  />
  <Button type="submit" variant="outline-light" className="ms-2">
    Search
  </Button>
</Form>


        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
