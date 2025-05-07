import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = ({ setIsLogin }) => {
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      login(data.token); // Store token using AuthContext
      navigate("/home");
    } catch (error) {
      console.log(error);
      setMessage("Invalid Credentials!");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "90%",
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        borderRadius: "15px",
        background: "rgba(10, 25, 50)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "white" }}>
        Login
      </h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <div
        style={{ textAlign: "left", marginBottom: "10px", color: "#D3D3D3" }}
      >
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "95%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "left",
          marginBottom: "10px",
          color: "#D3D3D3",
          position: "relative",
        }}
      >
        <label>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "95%",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {show ? <EyeOff color="black" /> : <Eye color="black" />}
          </span>
        </div>
      </div>

      <button
        onClick={submitHandler}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          background: "#009900",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "10px",
        }}
      >
        Login
      </button>

      <p style={{ marginTop: "15px", fontSize: "14px", color: "#D3D3D3" }}>
        Not registered?{" "}
        <span
          onClick={() => setIsLogin(false)}
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default Login;
