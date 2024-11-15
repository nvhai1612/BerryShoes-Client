// src/components/Slideshow.js
import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Slideshow() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          style={{
            objectFit: "cover",
            height: "500px", // Chiều cao cố định
            width: "100%", // Chiều rộng cố định
            maxWidth: "100%", // Đảm bảo không vượt quá khung
            maxHeight: "500px", // Đảm bảo chiều cao tối đa
          }}
          className="d-block w-100"
          src="https://file.hstatic.net/200000278317/file/m-moi-nhat-danh-rieng-cho-ninja-rua-1_c8a876818d6343c2a45566b314eeffa5.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First Slide</h3>
          <p>Description for first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            objectFit: "cover",
            height: "500px",
            width: "100%",
            maxWidth: "100%",
            maxHeight: "500px",
          }}
          className="d-block w-100"
          src="https://www.ultrafootball.com/cdn/shop/articles/Nike_Reveals_The_Phantom_GX_II_EH9_Erling_Haaland_Signature_Edition_bc784aa7-2f0a-4a78-99cc-2d7c32b6fa75_1296x.jpg?v=1712122258"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second Slide</h3>
          <p>Description for second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            objectFit: "cover",
            height: "500px",
            width: "100%",
            maxWidth: "100%",
            maxHeight: "500px",
          }}
          className="d-block w-100"
          src="https://static.runnea.com/images/202406/nike-pegasus41-evolucion-icono-running-ajuste-perfecto.jpg?1"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third Slide</h3>
          <p>Description for third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;
