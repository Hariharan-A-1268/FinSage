import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAuth } from "../Components/Authentication/AuthContext";

axios.defaults.baseURL = "https://finsage.onrender.com";

const HomePage = () => {
  const COLORS = ["#4BCD3E", "#FFB400", "#36A2EB", "#f54242"];

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [Income, setIncome] = useState(0);
  const [userName, setUserName] = useState("...");
  const [formData, setFormData] = useState({
    income: "",
    riskLevel: "Select risk level",
    returnPeriod: "",
  });
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          logout(); // Force logout if no token found
          return;
        }

        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserName(response.data.name);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response ? error.response.data : error.message
        );
        logout();
      }
    };

    fetchUserProfile();
  }, [logout]);

  const [investmentResult, setInvestmentResult] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://finsage.onrender.com/api/investment-recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      const { Income, ...filteredData } = data;
      setIncome(Income);
      console.log(filteredData);
      setInvestmentResult(filteredData);
    } catch (error) {
      console.error("Error fetching investment recommendation:", error);
    }
  };

  const handleInvestmentClick = (asset) => {
    const normalizedAsset = asset.trim().toLowerCase();
    console.log("Clicked Asset:", normalizedAsset); // Debugging
    if (normalizedAsset === "recurring deposits") {
      navigate("/recurringDeposit");
    } else if (normalizedAsset === "gold") {
      navigate("/gold");
    } else if (
      normalizedAsset === "fixed deposits" ||
      normalizedAsset === "fixed deposit"
    ) {
      navigate("/fixedDeposit");
    } else if (
      normalizedAsset === "mutual fund" ||
      normalizedAsset === "mutual funds"
    ) {
      navigate("/mutualFund");
    } else {
      console.log("No route defined for", asset);
    }
  };
  const InvestmentComponent = ({ investmentResult }) => {
    if (!investmentResult || Object.keys(investmentResult).length === 0) {
      return <p style={{ color: "white" }}>No data available for chart</p>;
    }
  };
  const chartData = investmentResult
    ? Object.entries(investmentResult).map(([asset, percent]) => ({
        name: asset,
        value: percent * 100, // Convert decimal to percentage
      }))
    : [];
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
      {/* Greeting */}
      <h1
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "2rem",
          color: "white",
          paddingLeft: "10%",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        {`${getGreeting()} ${userName} ...`.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
      <div
        style={{
          position: "relative",
          padding: "20px", // Reduce padding
          paddingLeft: "14px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "0 10%", // Ensure proper centering
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
                Investment Amount
              </label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                placeholder="Enter Investment Amount"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
            </div>

            {/* Risk Level Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="riskLevel"
              >
                Risk Level
              </label>
              <select
                id="riskLevel"
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="Select risk level">---Select---</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Return Period Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="returnPeriod"
              >
                Return Period
              </label>
              <input
                type="number"
                id="returnPeriod"
                name="returnPeriod"
                value={formData.returnPeriod}
                onChange={handleInputChange}
                placeholder="Years"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
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

      {/* New Div Below Form - Split into Two Sections */}
      {investmentResult && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            gap: "20px",
          }}
        >
          <InvestmentComponent investmentResult={investmentResult} />
          {/* Left Side - Options */}
          <div
            style={{
              width: "48%",
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {/* Heading Changes Dynamically */}
            <h3 style={{ color: "white" }}>
              {/* {showAI
                ? "Investment Recommendation with AI"
                : "Investment Recommendation"} */}
              Investment Recommendation with AI
            </h3>

            {/* Icon for AI or Reset */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
            ></div>

            {/* Options List - Toggle AI/Normal */}
            {
              <div>
                {/* Header Card */}
                <div
                  style={{
                    marginBottom: "10px",
                    padding: "20px 20px",
                    background: "#4bcd3e",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", fontWeight: "bold" }}>
                    <div style={{ flex: 1, textAlign: "left" }}>Investment</div>
                    <div style={{ flex: 1, textAlign: "center" }}>Amount</div>
                    <div style={{ flex: 1, textAlign: "right" }}>
                      Percentage
                    </div>
                  </div>
                </div>

                {/* Investment Result List */}
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  {investmentResult &&
                    Object.entries(investmentResult)
                      .sort(([, a], [, b]) => b - a)
                      .map(([asset, percent], index) => {
                        const amount = (Income * percent).toFixed(0);
                        console.log(asset);
                        return (
                          <li
                            key={index}
                            style={{
                              marginBottom: "10px",
                              padding: "15px",
                              background: "#ffffff",
                              borderRadius: "8px",
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                              transition: "all 0.3s ease-in-out",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                            onClick={() => handleInvestmentClick(asset)}
                          >
                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  flex: 1,
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  color: "#007BFF",
                                }}
                              >
                                {asset}
                              </div>
                              <div
                                style={{
                                  flex: 1,
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  color: "#007BFF",
                                }}
                              >
                                ₹{amount}
                              </div>
                              <div
                                style={{
                                  flex: 1,
                                  textAlign: "right",
                                  fontWeight: "bold",
                                  color: "#007BFF",
                                }}
                              >
                                {percent * 100}%
                              </div>
                            </div>
                          </li>
                        );
                      })}
                </ul>
              </div>
            }
          </div>

          {/* Right Side - Blank Box */}
          <div
            style={{
              width: "48%",
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
            }}
          >
            {investmentResult && Object.keys(investmentResult).length > 0 ? (
              <PieChart width={400} height={400}>
                <text
                  x="50%"
                  y="10%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={18}
                  fontWeight="bold"
                  fill="white"
                >
                  Investment Analysis with AI
                </text>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <p style={{ color: "white", textAlign: "center" }}>
                No Data Available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
