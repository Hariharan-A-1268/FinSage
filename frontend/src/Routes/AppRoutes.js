import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import MutualFundPage from "../Components/MutualFund/Home";
import Layout from "../Components/Layout";
import ProtectedRoute from "../Components/ProtectedRoute";
import Recommend from "../Components/MutualFund/Recommendation";
import AboutFund from "../Components/MutualFund/AboutFund";
import GoldPage from "../Components/Gold/Gold";
import FDPage from "../Components/FixedDeposit/FixedDeposit"
import RDPage from "../Components/RecurringDeposit/RecurringDeposit";
import AccountPage from "../Components/Account/Account";
import Trending from "../Components/News/Trending";
import ChatUI from "../Components/ChatBot/Chatbot";
import ETPage from "../Components/ExpenseTracker/ExpenseTracker";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/account" element={<AccountPage/>}/>
          <Route path="/mutualfund" element={<MutualFundPage />} />
          <Route path="/mutualfund/recommendation" element={<Recommend />} />
          <Route path="/mutualfund/aboutfund" element={<AboutFund />} />
          <Route path="/gold" element={<GoldPage />} />
          <Route path="/fixedDeposit" element={<FDPage/>}/>
          <Route path="/RecurringDeposit" element={<RDPage/>}/>
          <Route path="/news" element={<Trending/>}/>
          <Route path="/chatbot" element={<ChatUI/>}/>
          <Route path="/expensetracker" element={<ETPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
