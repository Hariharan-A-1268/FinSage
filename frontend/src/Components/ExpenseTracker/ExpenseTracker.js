import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const ETPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      amount: "",
      date: "",
      useful: "Select useful or not",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        } catch (error) {
          console.error("Error fetching investment recommendation:", error);
        }
    };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        paddingTop: "5px", // Reduced from 20px
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "rgba(10, 25, 50)",
        position: "relative",
        paddingBottom: "150px",
      }}
    >
      <h1
        style={{
          textAlign: "left",
          fontFamily: "Arial, sans-serif",
          fontSize: "40px",
          marginTop: "20px",
          paddingLeft: "10%",
          paddingBottom: "10px",
          color:"White",
        }}
      >
        Expense Tracker
      </h1>
      <div
        style={{
          position: "relative",
          padding: "20px",
          paddingLeft: "14px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "0 10%",
          maxWidth: "1000px",
          backdropFilter: "blur(10px)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              justifyContent: "space-between",
              marginBottom: "15px",
              color: "white",
            }}
          >
            {/* Income Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="income"
              >
                Amount Spent
              </label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                placeholder="Enter amount"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
            </div>

            {/* Date Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
            <label
                style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                }}
                htmlFor="date"
            >
                Date
            </label>
            <input
                type="date"
                id="date"
                name="date"
                value={formData.date || ""}
                onChange={handleInputChange}
                style={{
                width: "90%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                }}
                required
            />
            </div>

            {/* Useful - Dropdown */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
                htmlFor="useful"
              >
                Useful
              </label>
              <select
                id="useful"
                name="useful"
                value={formData.useful}
                onChange={handleInputChange}
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              >
                <option value="Select">---Select---</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#4bcd3e",
                color: "rgba(10, 25, 50)",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "5px",
                alignSelf: "flex-end",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    
    </div>
  );
};

export default ETPage;
