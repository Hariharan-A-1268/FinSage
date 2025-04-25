import React from "react";
import { TrendingUp } from "lucide-react";

const StockNews = () => {
  return (
    <div
      style={{
        margin: "auto",
        textAlign: "left",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        height: "auto",
        backgroundColor: "rgba(10, 25, 50)",
        paddingLeft: "20px",
      }}
    >
      <h1 style={{ color: "white", fontSize: "32px", display: "flex", alignItems: "center", gap: "10px",paddingLeft:"9%" }}>
      Stock <TrendingUp size={32} color="green" />
      </h1>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", padding: "20px",paddingLeft:"9%"}}>
        {[...Array(10)].map((_, index) => (
          <div key={index} style={{ backgroundColor: "white", width: "80%", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}>
            <p style={{ color: "black", fontSize: "1rem" }}>Trending Item {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNews;
