import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/Authentication/AuthContext";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
