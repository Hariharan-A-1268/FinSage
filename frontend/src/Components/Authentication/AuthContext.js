import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    // alert("Session expired. You will be redirected to the login page.");
    navigate("/"); // Redirect to login page
  };

  const login = (accessToken) => {
    const decodedToken = jwtDecode(accessToken); // Decode the token to get expiration
    const expirationTime = decodedToken.exp * 1000; // Convert expiration to milliseconds

    setUser(decodedToken.identity); // Set the user information from the token
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("tokenExpiration", expirationTime);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem("tokenExpiration");
      const currentTime = Date.now();

      if (expirationTime && currentTime > expirationTime) {
        alert("Session expired. You will be redirected to the login page.");
        logout(); // Call logout if token has expired
      }
    };

    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = Date.now();

    if (storedToken && expirationTime && currentTime < expirationTime) {
      login(storedToken); // Restore session if token is still valid
    } else {
      //   alert("Session expired. You will be redirected to the login page.");
      logout(); // Force logout if token is invalid or expired
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
