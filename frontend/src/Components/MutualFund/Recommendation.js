import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://finsage.onrender.com";

const Recommend = () => {
  const [formData, setFormData] = useState({
    investmentAmount: "",
    riskLevel: "Select risk level",
    returnPeriod: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/mf/recommendation", formData);
      console.log(response.data);

      setRecommendations(response.data); // Store backend response
      setShowOptions(true); // Show recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const [filterText, setFilterText] = useState("");
  const filteredResults = recommendations.filter((fund) =>
    fund.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const totalPages = Math.ceil(recommendations.length / cardsPerPage);

  const currentCards = filteredResults.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        paddingTop: "5px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(10, 25, 50)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        color: "white",
        paddingBottom: "150px",
      }}
    >
      <h1
        style={{ textAlign: "left", paddingLeft: "10%", paddingBottom: "10px" }}
      >
        Mutual Fund Recommendation
      </h1>

      {/* Form Container */}
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
            }}
          >
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
                <option value="Low Risk">Low</option>
                <option value="Low to Moderate Risk">Low to Moderate</option>
                <option value="Moderate Risk">Moderate</option>
                <option value="Moderately High Risk">Moderately High</option>
                <option value="High Risk">High</option>
                <option value="Very High Risk">Very High</option>
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
              <select
                id="returnPeriod"
                name="returnPeriod"
                value={formData.returnPeriod}
                onChange={handleInputChange}
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="">---Select a Period---</option>
                <option value="1_year">1 Year</option>
                <option value="3_year">3 Year</option>
                <option value="5_year">5 Year</option>
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

      {/* New Div Below Form - Recommendations */}
      {showOptions && (
        <div
          style={{
            width: "80%",
            maxWidth: "1000px",
            margin: "auto",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "24px", color: "#4bcd3e" }}>
            Recommendations
          </h2>

          {/* Dynamic Filter */}
          <input
            type="text"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by fund Name..."
            style={{
              display: "block",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "30%",
              fontSize: "16px",
              fontWeight: "bold",
              marginLeft: "80px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {recommendations.length > 0 ? (
              <>
                {currentCards.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "20px",
                      borderRadius: "12px",
                      textAlign: "left",
                      fontWeight: "normal",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      width: "80%",
                      margin: "auto",
                      lineHeight: "1.8",
                    }}
                  >
                    <a
                      href={option.detail_info}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          columnGap: "70px",
                          rowGap: "10px",
                        }}
                      >
                        <div
                          style={{ gridColumn: "span 2", whiteSpace: "nowrap" }}
                        >
                          <strong>Name:</strong> {option.name}
                        </div>
                        <div>
                          <strong>ISIN:</strong> {option.isin}
                        </div>
                        <div>
                          <strong>1 Year Return:</strong> {option["1_year"]}%
                        </div>
                        <div>
                          <strong>Category:</strong> {option.category}
                        </div>
                        <div>
                          <strong>3 Year Return:</strong> {option["3_year"]}%
                        </div>
                        <div>
                          <strong>SIP Available:</strong>{" "}
                          {option.sip_available ? "Yes" : "No"}
                        </div>
                        <div>
                          <strong>5 Year Return:</strong> {option["5_year"]}%
                        </div>
                        <div>
                          <strong>Lump Sum Available:</strong>{" "}
                          {option.lump_available ? "Yes" : "No"}
                        </div>
                        <div>
                          <strong>Volatility:</strong> {option.volatility}
                        </div>
                        <div>
                          <strong>Maturity Type:</strong> {option.maturity_type}
                        </div>
                        <div>
                          <strong>Last NAV:</strong> ₹{option.last_nav}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}

                {/* Pagination Controls */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    gap: "10px",
                  }}
                >
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#4bcd3e",
                      color: "#0a1932",
                      fontWeight: "bold",
                      fontSize: "16px",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    Prev
                  </button>

                  <span style={{ alignSelf: "center", fontWeight: "bold" }}>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#4bcd3e",
                      color: "#0a1932",
                      fontWeight: "bold",
                      fontSize: "16px",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p>No recommendations found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommend;
