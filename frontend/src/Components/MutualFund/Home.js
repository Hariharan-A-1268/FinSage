import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const MutualFundPage = () => {
  const navigate = useNavigate();

  // Sample Data for Asset Allocation
  const data = [
    { name: "Equities", value: 50 },
    { name: "Debt", value: 30 },
    { name: "Cash", value: 10 },
    { name: "Others", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div
      style={{
        color: "white",
        backgroundColor: "rgba(10, 25, 50)",
        padding: "20px 45px 20px 70px",
        height: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "left",
          fontFamily: "Arial, sans-serif",
          fontSize: "40px",
          marginBottom: "0px",
          marginTop: "0px",
          paddingLeft: "4%",
          paddingBottom: "10px",
        }}
      >
        Mutual Fund
      </h1>

      <h3
        style={{
          color: "red",
          fontSize: "16px",
          fontWeight: "normal",
          marginTop: "0px",
          marginBottom: "20px",
          paddingLeft: "4%",
        }}
      >
        Mutual fund investments are subject to market risks. Please read the
        scheme information and other related documents carefully before
        investing.
      </h3>

      <div style={{ display: "flex" }}>
        {/* Description */}
        <div style={{ flex: 1, marginRight: "10px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              marginBottom: "20px",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              textAlign: "justify",
              lineHeight: "1.6",
              paddingLeft: "6%",
              paddingRight: "2%",
            }}
          >
            Mutual funds pool money from multiple investors to buy a diversified
            portfolio of stocks, bonds, or other securities. Managed by
            professional fund managers, they aim for capital appreciation or
            income generation. They offer benefits like diversification,
            liquidity, and professional management, making them popular for both
            individual and institutional investors. Investors can choose from
            equity, bond, or balanced funds based on their risk tolerance and
            goals. It's crucial to research and select funds that align with
            your financial strategy and objectives.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              textAlign: "justify",
              lineHeight: "1.6",
              paddingLeft: "6%",
              paddingRight: "2%",
            }}
          >
            Mutual funds are also available in various forms, such as actively
            managed funds and index funds, catering to different investment
            preferences. Actively managed funds rely on fund managers' expertise
            to outperform the market, while index funds track a specific index,
            offering a cost-effective option for investors. Tax benefits on
            certain mutual fund investments, like Equity Linked Savings Schemes
            (ELSS), make them appealing for tax-conscious investors. Moreover,
            mutual funds provide systematic investment plans (SIPs) that enable
            individuals to invest small amounts regularly, making it accessible
            to those with limited capital.
          </motion.p>
        </div>

        {/* Pie Chart Container */}
        <div
          style={{
            width: "350px",
            height: "350px",
            border: "1px solid #000",
            padding: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Asset Allocation
          </div>

          <PieChart width={290} height={310}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ color: "white" }} />
          </PieChart>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ textAlign: "center", marginLeft: "-50px" }}>
        <button
          style={{
            backgroundColor: "#4bcd3e",
            color: "black",
            border: "none",
            padding: "12px 25px",
            margin: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "17px",
          }}
          onClick={() => navigate("/mutualfund/recommendation")}
        >
          Recommendation
        </button>
        <button
          style={{
            backgroundColor: "#4bcd3e",
            color: "black",
            border: "none",
            padding: "12px 25px",
            margin: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "17px",
          }}
          onClick={() => navigate("/mutualfund/aboutfund")}
        >
          About Fund
        </button>
      </div>
      <h2
        style={{
          fontSize: "30px",
          color: "#4bcd3e",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Related Links
      </h2>
      <ul
        style={{
          paddingLeft: "20px", // Keep indentation for bullets
          marginLeft: 0,
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          textAlign: "center", // Adds space between items
        }}
      >
        <li>
          <a
            href="https://groww.in/p/beginners-guide-mutual-funds"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "18px", color: "white", textDecoration: "none" }}
          >
            Groww.com
          </a>
        </li>
        <li>
          <a
            href="https://www.bankbazaar.com/mutual-fund.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "18px", color: "white", textDecoration: "none" }}
          >
            BankBazaar.com
          </a>
        </li>
        <li>
          <a
            href="https://cleartax.in/glossary/mutual-funds"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "18px", color: "white", textDecoration: "none" }}
          >
            ClearTax.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MutualFundPage;
