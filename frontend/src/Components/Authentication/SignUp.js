import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

axios.defaults.baseURL = "https://finsage.onrender.com";

const SignUp = ({ setIsLogin }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/user/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsLogin(true);
      login(data.token); // Store token using AuthContext
      navigate("/home");
    } catch (error) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        padding: "20px",
        width: "90%",
        maxWidth: "400px",
        margin: "auto",
        borderRadius: "15px",
        background: "rgba(10, 25, 50)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "white" }}>
        Sign Up
      </h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <div
        style={{ textAlign: "left", marginBottom: "10px", color: "#D3D3D3" }}
      >
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      {[
        {
          label: "Password",
          value: password,
          setValue: setPassword,
          show: showPassword,
          toggle: togglePasswordVisibility,
        },
        {
          label: "Confirm Password",
          value: confirmPassword,
          setValue: setConfirmPassword,
          show: showConfirmPassword,
          toggle: toggleConfirmPasswordVisibility,
        },
      ].map((field, index) => (
        <div
          key={index}
          style={{
            textAlign: "left",
            marginBottom: "10px",
            color: "#D3D3D3",
            position: "relative",
          }}
        >
          <label>{field.label}</label>
          <input
            type={field.show ? "text" : "password"}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            value={field.value}
            onChange={(e) => field.setValue(e.target.value)}
            required
            style={{
              width: "95%",
              padding: "10px",
              marginTop: "1px",
              marginBottom: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {field.show ? (
            <EyeOff
              size={20}
              style={{
                position: "absolute",
                right: "10px",
                top: "60%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "black",
              }}
              onClick={field.toggle}
            />
          ) : (
            <Eye
              size={20}
              style={{
                position: "absolute",
                right: "10px",
                top: "60%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "black",
              }}
              onClick={field.toggle}
            />
          )}
        </div>
      ))}

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
        Sign Up
      </button>

      <p style={{ marginTop: "15px", fontSize: "14px", color: "#D3D3D3" }}>
        Already have an account?{" "}
        <span
          onClick={() => setIsLogin(true)}
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignUp;
