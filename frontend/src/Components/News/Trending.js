import React, { useState, useEffect } from "react";
import axios from "axios";

const options = [
  "Financial News",
  "Gold",
  "Mutual Fund",
  "Fixed Deposit",
  "Recurring Deposit",
];

const Trending = () => {
  const [activeOption, setActiveOption] = useState("Gold");
  const [items, setItems] = useState([]);

  const fetchData = async (category) => {
    try {
      const formattedCategory = category.toLowerCase().replace(/\s/g, '');
      const response = await axios.get(`http://localhost:5000/api/news/${formattedCategory}`);
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(activeOption);
  }, [activeOption]);

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "left",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "rgba(10, 25, 50)",
        paddingLeft: "20px",
        paddingBottom: "40px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", paddingBottom: "20px" }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setActiveOption(option)}
            style={{
              backgroundColor: activeOption === option ? "#4bcd3e" : "white",
              color: activeOption === option ? "black" : "black",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <div style={{ marginTop:"30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
        {items.map((item, index) => (
          <div
          key={index}
          style={{
            
            backgroundColor: "white",
            width: "800px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            marginBottom: "20px", // Ensures vertical spacing between cards
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "1rem",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#1e90ff"; // DodgerBlue
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "black";
              e.target.style.textDecoration = "none";
            }}
          >
            {item.title || `Top ${activeOption} News ${index + 1}`}
          </a>
        
          <span style={{ fontSize: "0.85rem", color: "#555" }}>
            {item.source ? `Source: ${item.source}` : "Source: Unknown"}
          </span>
        
          <span style={{ fontSize: "0.75rem", color: "#777" }}>
            {item.published ? `Published: ${new Date(item.published).toLocaleString()}` : ""}
          </span>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default Trending;
