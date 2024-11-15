import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function AccountPage() {
  const [currentForm, setCurrentForm] = useState("login");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Vui lòng nhập email.");
      return;
    }
    setMessage(
      `Mã xác nhận đã được gửi tới email ${email}. Vui lòng kiểm tra hộp thư của bạn.`
    );
    setEmail("");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            cursor: "pointer",
            padding: "10px",
            fontSize: "18px",
            color: currentForm === "login" ? "#007bff" : "#6c757d",
            fontWeight: currentForm === "login" ? "bold" : "normal",
            borderBottom:
              currentForm === "login" ? "2px solid #007bff" : "none",
          }}
          onClick={() => setCurrentForm("login")}
        >
          ĐĂNG NHẬP
        </h2>
        <span style={{ margin: "0 10px", fontSize: "18px" }}>|</span>
        <h2
          style={{
            cursor: "pointer",
            padding: "10px",
            fontSize: "18px",
            color: currentForm === "register" ? "#007bff" : "#6c757d",
            fontWeight: currentForm === "register" ? "bold" : "normal",
            borderBottom:
              currentForm === "register" ? "2px solid #007bff" : "none",
          }}
          onClick={() => setCurrentForm("register")}
        >
          ĐĂNG KÝ
        </h2>
      </div>

      {currentForm === "login" && (
        <Form>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control
              type="text"
              placeholder="Vui lòng nhập tên đăng nhập"
              required
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              borderColor: "#007bff",
            }}
          >
            Đăng nhập
          </Button>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0",
              }}
              onClick={() => setCurrentForm("forgotPassword")}
            >
              Bạn quên mật khẩu?
            </button>
          </div>
        </Form>
      )}

      {currentForm === "register" && (
        <Form>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control type="text" placeholder="Tên đăng nhập" required />
          </Form.Group>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control type="email" placeholder="Email" required />
          </Form.Group>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control type="password" placeholder="Mật khẩu" required />
          </Form.Group>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control
              type="password"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              borderColor: "#007bff",
            }}
          >
            Đăng ký
          </Button>
        </Form>
      )}

      {currentForm === "forgotPassword" && (
        <Form onSubmit={handleForgotPassword}>
          <h3 style={{ textAlign: "center" }}>Khôi phục mật khẩu</h3>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              borderColor: "#007bff",
            }}
          >
            Gửi yêu cầu
          </Button>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0",
              }}
              onClick={() => setCurrentForm("login")}
            >
              Quay lại Đăng nhập
            </button>
          </div>
          {message && (
            <Alert variant="info" style={{ marginTop: "15px" }}>
              {message}
            </Alert>
          )}
        </Form>
      )}
    </div>
  );
}

export default AccountPage;
