import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  User,
  ChevronDown,
  BarChart3,
  Newspaper,
  Bot,
  TrendingUp,
  Home,
} from "lucide-react";

const Navbar = () => {
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-[#4bcd3e] pt-1 pb-2 flex justify-end shadow-md h-[5vh]">
      <div className="flex items-center justify-end w-[90%] max-w-[1200px]">
        <div className="flex gap-5 items-center">
          <Link to="/chatbot" className="flex items-center gap-1 text-[rgba(10,25,50)] no-underline text-base cursor-pointer">
            <Bot size={25} /> ChatBot
          </Link>
          <div
            className="relative flex items-center gap-1 text-[rgba(10,25,50)] no-underline text-base cursor-pointer"
            onMouseEnter={() => setIsInvestmentOpen(true)}
            onMouseLeave={() => setIsInvestmentOpen(false)}
          >
            <button className="flex items-center gap-1 bg-none border-none text-[rgba(10,25,50)] text-base cursor-pointer">
              <TrendingUp size={18} /> Investment Plan <ChevronDown size={16} />
            </button>
            {isInvestmentOpen && (
              <div className="absolute top-full right-0 bg-[rgba(10,25,50)] flex flex-col rounded-md p-2 shadow-lg z-10 w-[120px]">
                <Link to="/mutualfund" className="text-white p-1 no-underline text-sm">Mutual Fund</Link>
                <Link to="/fixedDeposit" className="text-white p-1 no-underline text-sm">Fixed Deposit</Link>
                <Link to="/recurringDeposit" className="text-white p-1 no-underline text-sm">Recurring Deposit</Link>
                <Link to="/gold" className="text-white p-1 no-underline text-sm">Gold</Link>
                {/* <Link to="/stocks" className="text-white p-1 no-underline text-sm">Stocks</Link> */}
              </div>
            )}
          </div>

          <Link to="http://localhost:5173" className="flex items-center gap-1 text-[rgba(10,25,50)] no-underline text-base cursor-pointer">
            <BarChart3 size={18} /> Expense Tracker
          </Link>
          <div
            className="relative flex items-center gap-1 text-[rgba(10,25,50)] no-underline text-base cursor-pointer"
            onMouseEnter={() => setIsNewsOpen(true)}
            onMouseLeave={() => setIsNewsOpen(false)}
          >
            <Link to="/news" className="flex items-center gap-1 text-[rgba(10,25,50)] no-underline text-base cursor-pointer">
              <Newspaper size={18} /> News
            </Link>
          </div>
          <Link to="/home" className="flex items-center gap-1 text-[rgba(10,25,50)] no-underline text-base cursor-pointer">
            <Home size={18} /> Home
          </Link>
          <div
            className="relative flex items-center gap-1 text-[rgba(10,25,50)] no-underline text-base cursor-pointer"
            onMouseEnter={() => setIsUserOpen(true)}
            onMouseLeave={() => setIsUserOpen(false)}
          >
            <button className="flex items-center gap-1 bg-none border-none text-[rgba(10,25,50)] text-base cursor-pointer">
              <User size={20} />
            </button>
            {isUserOpen && (
              <div className="absolute top-full right-0 bg-[rgba(10,25,50)] flex flex-col rounded-md p-1 shadow-lg z-10 w-[90px] text-white">
                <Link to="/account" className="text-white p-1 no-underline text-sm">Account</Link>
                <button
                  onClick={handleLogout}
                  className="text-white p-1 no-underline text-sm bg-[rgba(10,25,50)] border-none cursor-pointer text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <button className="hidden bg-none border-none text-white">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
