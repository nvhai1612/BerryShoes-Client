import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

function MyNavbar({ onSearch, cartItemCount }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logoImage} alt="Logo" width="50" height="40" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Trang Chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Sản Phẩm
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Về Chúng Tôi
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Liên Hệ
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Giới Thiệu
            </Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" type="submit">
              <FaSearch />
            </Button>
          </Form>

          <Nav className="ms-3">
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart />{" "}
              <span className="badge bg-dark text-white">{cartItemCount}</span>
            </Nav.Link>
            {/* Cập nhật liên kết đến trang đăng nhập */}
            <Nav.Link as={Link} to="/login">
              <FaUser />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
