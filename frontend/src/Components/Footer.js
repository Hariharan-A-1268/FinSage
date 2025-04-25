import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#4bcd3e",
        padding: "3px",
        textAlign: "center",
        position: "relative",
        bottom: "0",
        left: "0",
        width: "100%",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p
        style={{
          margin: "0",
          fontSize: "14px",
          color: "rgba(10, 25, 50)",
          fontWeight: "bold",
        }}
      >
        © {new Date().getFullYear()} FIS. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
