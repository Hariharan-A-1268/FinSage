import React, { useState } from "react";
import { Search } from "lucide-react";
import MFPriceChart from "./MutualFundChart";

const AboutFund = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFund, setSelectedFund] = useState(null);
  const [isin, setIsin] = useState(null);

  const funds = [
    { isin: "INF00XX01283", name: "ITI Liquid Growth Direct Plan" },
    {
      isin: "INF00XX01333",
      name: "ITI Liquid Annually IDCW Reinvest Direct Plan",
    },
    {
      isin: "INF00XX01366",
      name: "ITI Liquid Annually IDCW Payout Direct Plan",
    },
    {
      isin: "INF00XX01440",
      name: "ITI Arbitrage Growth Direct Plan",
    },
    {
      isin: "INF00XX01457",
      name: "ITI Arbitrage IDCW Payout Direct Plan",
    },
    { isin: "INF00XX01465", name: "ITI Arbitrage IDCW Reinvest Direct Plan" },
    { isin: "INF00XX01564", name: "ITI Overnight Growth Direct Plan" },
    {
      isin: "INF03VN01043",
      name: "Whiteoak Capital Liquid Growth Direct Plan",
    },
    {
      isin: "INF03VN01209",
      name: "Whiteoak Capital Ultra Short Duration Growth Direct Plan",
    },
    { isin: "INF044D01BV7", name: "Taurus Flexi Cap IDCW Payout Direct Plan" },
    { isin: "INF044D01BX3", name: "Taurus Largecap Equity Growth Direct Plan" },
    {
      isin: "INF044D01BY1",
      name: "Taurus Largecap Equity IDCW Payout Direct Plan",
    },
    { isin: "INF044D01CA9", name: "Taurus Discovery Growth Direct Plan" },
    {
      isin: "INF082J01168",
      name: "Quantum Multi Asset FoF Growth Direct Plan",
    },
    {
      isin: "INF082J01176",
      name: "Quantum Dynamic Bond Growth Direct Plan",
    },
    {
      isin: "INF082J01184",
      name: "Quantum Dynamic Bond Monthly IDCW Payout Direct Plan",
    },
    {
      isin: "INF082J01192",
      name: "Quantum Dynamic Bond Monthly IDCW Reinvest Direct Plan",
    },
    {
      isin: "INF090I01FE6",
      name: "Franklin India Technology Growth Direct Plan",
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [showOptions, setShowOptions] = useState(false);
  const handleFundClick = (fund) => {
    fetch("https://finsage.onrender.com/api/mf/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fund),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedFund(data);
        setIsin(fund.isin);
        setSearchTerm("");
      })
      .catch((error) => {
        console.error("Error sending fund to backend:", error);
      });
  };

  const filteredFunds = funds.filter(
    (fund) =>
      fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.isin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "rgba(10, 25, 50)",
        padding: "20px",
        minHeight: "100vh",
        paddingLeft: "45px",
        paddingRight: "45px",
      }}
    >
      <h1
        style={{
          paddingLeft: "9%",
          color: "white",
          textAlign: "left",
          fontFamily: "Arial, sans-serif",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        About Fund
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          paddingLeft: "9%",
        }}
      >
        <div style={{ position: "relative", width: "300px" }}>
          <Search
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#ccc",
            }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "10px 10px 10px 35px", // Adjust padding to make space for the icon
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      {searchTerm && (
        <div
          style={{
            width: "900px",
            paddingLeft: "2%",
            color: "black",
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "10px",
            marginLeft: "9%",
          }}
        >
          {filteredFunds.map((fund) => (
            <div
              key={fund.isin}
              style={{ marginBottom: "10px", cursor: "pointer" }}
              onClick={() => handleFundClick(fund)}
            >
              <strong>{fund.name}</strong> ({fund.isin})
            </div>
          ))}
        </div>
      )}

      {selectedFund && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
              width: "100%",
              marginBottom: "50px",
            }}
          >
            <div
              style={{
                width: "70%",
                padding: "40px",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
              }}
            >
              <MFPriceChart isin={isin} />
            </div>
          </div>

          <div
            style={{
              width: "900px",
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              color: "black",
              marginLeft: "9%",
            }}
          >
            <h2>{selectedFund.fund_name}</h2>
            {/* <p><strong>ISIN:</strong> {selectedFund.isin}</p> */}
            <p>
              <strong>Category:</strong> {selectedFund.details.category.value} (
              {selectedFund.details.category?.note})
            </p>
            <p>
              <strong>Type:</strong> {selectedFund.details.type.value} (
              {selectedFund.details.type?.note})
            </p>

            <p>
              <strong>CRISIL Rating:</strong>{" "}
              {selectedFund.details.crisil_rating?.value} (
              {selectedFund.details.crisil_rating?.note})
            </p>
            <p>
              <strong>Expense Ratio:</strong>{" "}
              {selectedFund.details.expense_ratio?.value} (
              {selectedFund.details.expense_ratio?.note})
            </p>
            <p>
              <strong>AUM:</strong> {selectedFund.details.aum.value} (
              {selectedFund.details.aum?.note})
            </p>

            <p>
              <strong>Fund Rating:</strong>{" "}
              {selectedFund.details.fund_rating?.stars} (
              {selectedFund.details.fund_rating?.note})
            </p>
            <p>
              <strong>Info Ratio:</strong>{" "}
              {selectedFund.details.info_ratio?.value} (
              {selectedFund.details.info_ratio?.note})
            </p>
            <p>
              <strong>Investment Options:</strong>
            </p>
            <ul>
              <li>
                <strong>Lumpsum:</strong>{" "}
                {selectedFund.details.investment_options?.lumpsum?.available
                  ? "Available"
                  : "Not Available"}{" "}
                (Minimum:{" "}
                {selectedFund.details.investment_options?.lumpsum?.minimum},{" "}
                {selectedFund.details.investment_options?.lumpsum?.note})
              </li>
              <li>
                <strong>SIP:</strong>{" "}
                {selectedFund.details.investment_options?.sip?.available
                  ? "Available"
                  : "Not Available"}{" "}
                (Minimum:{" "}
                {selectedFund.details.investment_options?.sip?.minimum},{" "}
                {selectedFund.details.investment_options?.sip?.note})
              </li>
            </ul>
            <p>
              <strong>Returns:</strong>
            </p>
            <ul>
              <li>
                <strong>1 Year:</strong>{" "}
                {selectedFund.details.returns?.["1_year"]?.value}% (
                {selectedFund.details.returns?.["1_year"]?.analysis}) (
                {selectedFund.details.returns?.["1_year"]?.note})
              </li>
              <li>
                <strong>3 Year:</strong>{" "}
                {selectedFund.details.returns?.["3_year"]?.value}% (
                {selectedFund.details.returns?.["1_year"]?.analysis}) (
                {selectedFund.details.returns?.["3_year"]?.note})
              </li>
              <li>
                <strong>5 Year:</strong>{" "}
                {selectedFund.details.returns?.["5_year"]?.value}% (
                {selectedFund.details.returns?.["1_year"]?.analysis}) (
                {selectedFund.details.returns?.["5_year"]?.note})
              </li>
              <li>
                <strong>Since Inception:</strong>{" "}
                {selectedFund.details.returns?.inception?.value}% (
                {selectedFund.details.returns?.inception?.note})
              </li>
            </ul>
            <p>
              <strong>Start Date:</strong>{" "}
              {selectedFund.details.start_date?.value} (
              {selectedFund.details.start_date?.note})
            </p>
            <p>
              <strong>Type:</strong> {selectedFund.details.type?.value} (
              {selectedFund.details.type?.note})
            </p>
            <p>
              <strong>Volatility:</strong>{" "}
              {selectedFund.details.volatility?.value} (
              {selectedFund.details.volatility?.analysis}) (
              {selectedFund.details.volatility?.note})
            </p>
            <p>
              <strong>Quick Summary:</strong>
            </p>
            <ul>
              {selectedFund.quick_summary?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>Should You Invest:</strong>{" "}
              {selectedFund.should_you_invest?.verdict} (
              {selectedFund.should_you_invest?.note})
            </p>
            <p>
              <strong>Reasons:</strong>
            </p>
            <ul>
              {selectedFund.should_you_invest?.reasons?.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
            <p>
              <strong>More Info:</strong>{" "}
              <a
                href={selectedFund.details.more_info_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutFund;
