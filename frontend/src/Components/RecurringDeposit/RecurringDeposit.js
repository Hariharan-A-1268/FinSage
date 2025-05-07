import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

axios.defaults.baseURL = "https://finsage.onrender.com";

const RDPage = () => {
  const [rdResults, setRdResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [filterText, setFilterText] = useState(""); // State for dynamic filter

  // Pagination logic
  const totalPages = Math.ceil(rdResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Apply filtering before pagination
  const filteredResults = rdResults.filter((plan) =>
    plan.Bank.toLowerCase().includes(filterText.toLowerCase())
  );
  const currentData = filteredResults.slice(startIndex, endIndex);

  const [formData, setFormData] = useState({
    amount: "",
    term: "",
  });

  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!formData.amount || !formData.term) {
      console.error("Missing input fields");
      return;
    }

    const payload = {
      amount: Number(formData.amount),
      term: Number(formData.term),
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch("/api/rd-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received Data:", data);

      setRdResults(data);
      setShowOptions(data.length > 0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        height: "auto",
        overflow: "hidden",
        backgroundColor: "rgba(10, 25, 50)",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "left",
          fontSize: "2.5rem",
          color: "white",
          paddingLeft: "10%",
          paddingBottom: "10px",
        }}
      >
        Recurring Deposit
      </h1>

      <div
        style={{
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "0% 10%",
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
            {/* Investment Amount Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="amount"
              >
                Investment amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter investment amount"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
            </div>

            {/* Return Period Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="term"
              >
                Return Period
              </label>
              <select
                id="term"
                name="term"
                value={formData.term}
                onChange={handleInputChange}
                required
                style={{
                  width: "95%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "white", // Light gray background
                  color: "#333", // Dark text for better contrast
                  cursor: "pointer",
                  appearance: "none",
                }}
              >
                <option value="">---Select a term---</option>
                <option value="1">1 Year</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
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

      {showOptions && (
        <div
          style={{
            width: "90%",
            maxWidth: "900px",
            margin: "30px auto",
            padding: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(15px)",
            textAlign: "center",
          }}
        >
          {/* Dynamic Filter */}
          <input
            type="text"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by Bank Name..."
            style={{
              display: "block",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "30%",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          />

          {/* Fixed Header Card */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: " #4bcd3e",
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
              marginBottom: "10px",
            }}
          >
            <p style={{ flex: 1, textAlign: "left" }}>Bank Name</p>
            <p style={{ flex: 1, textAlign: "center" }}>Interest Rate (%)</p>
            <p style={{ flex: 1, textAlign: "right" }}>Maturity Amount (₹)</p>
            <p style={{ flex: 1, textAlign: "right" }}>Real Amount (₹)</p>
          </div>

          {/* Dynamic Data in Cards */}
          {currentData.map((plan, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "white",
                fontWeight: "bold",
                fontSize: "16px",
                color: "black",
                marginBottom: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // Optional nice shadow
              }}
            >
              {/* Bank Name - Left aligned, wider */}
              <p style={{ flex: 2, textAlign: "left" }}>{plan.Bank}</p>

              {/* Interest Rate - Center aligned */}
              <p style={{ flex: 2, textAlign: "center" }}>
                {plan["Interest Rate (%)"]}%
              </p>

              {/* Maturity Amount - Right aligned */}
              <p style={{ flex: 2, textAlign: "right" }}>
                ₹{plan["Maturity Amount (₹)"]}
              </p>

              {/* Real Maturity Amount - Right aligned */}
              <p style={{ flex: 2, textAlign: "right", marginLeft: "12px" }}>
                ₹{plan["Real Maturity Amount (₹)"]}
              </p>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && rdResults.length > itemsPerPage && (
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  textAlign: "center",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#4bcd3e",
                  color: "black",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Prev
              </button>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  paddingTop: "7px",
                }}
              >
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#4bcd3e",
                  color: "black",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Fixed Deposit Description */}
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#4bcd3e", fontSize: "30px", textAlign: "center" }}>
          What is Recurring Deposit?
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              textAlign: "justify",
              fontSize: "16px",
              lineHeight: "1.6",
              width: "100%", // Ensures visibility
            }}
          >
            A Recurring Deposit (RD) is a type of term deposit offered by banks
            and financial institutions, designed to encourage regular savings
            among individuals. Unlike Fixed Deposits (FDs), where a lump sum is
            deposited at once, an RD allows individuals to deposit a fixed
            amount every month for a predetermined tenure. At the end of the
            term, the investor receives the total savings along with accumulated
            interest. This makes RDs a great option for salaried individuals or
            those who prefer disciplined saving habits.
            <br /> <br />
            One of the major benefits of a Recurring Deposit is that it provides
            stable and assured returns with minimal risk. The interest rate is
            fixed at the time of opening the RD account and remains the same
            throughout the tenure. Additionally, RDs offer flexibility in
            tenure, ranging from as short as six months to as long as ten years,
            allowing investors to choose a plan that suits their financial
            goals. Unlike market-linked investments, RDs are not affected by
            economic fluctuations, making them ideal for conservative investors.
            <br /> <br />
            Many banks also offer additional features such as premature
            withdrawal options, though a penalty may apply. Some banks even
            allow RDs to be used as collateral for loans, providing liquidity
            when needed. Since interest earned on RDs is taxable, individuals
            should consider their tax liability before investing. Overall,
            Recurring Deposits serve as a safe and convenient way to build
            savings over time while earning a fixed return on investment.
          </motion.p>
        </div>
        <h2
          style={{ fontSize: "30px", color: "#4bcd3e", marginBottom: "10px" }}
        >
          Related Links
        </h2>
        <ul
          style={{
            paddingLeft: "20px", // Keep indentation for bullets
            marginLeft: 0,
            display: "flex",
            gap: "30px", // Adds space between items
          }}
        >
          <li>
            <a
              href="https://groww.in/recurring-deposit"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "18px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Groww.com
            </a>
          </li>
          <li>
            <a
              href="https://www.bankbazaar.com/recurring-deposit.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "18px",
                color: "white",
                textDecoration: "none",
              }}
            >
              BankBazaar.com
            </a>
          </li>
          <li>
            <a
              href="https://cleartax.in/s/rd-recurring-depositst"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "18px",
                color: "white",
                textDecoration: "none",
              }}
            >
              ClearTax.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RDPage;
