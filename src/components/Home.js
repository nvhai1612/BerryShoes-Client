import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h1>Welcome to BerryShoes</h1>
          <p>Your one-stop destination for all your fashion needs.</p>
          <Button variant="success" as={Link} to="/shop">
            Shop Now
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Featured Products</h2>
          {/* Bạn có thể hiển thị các sản phẩm nổi bật tại đây */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
