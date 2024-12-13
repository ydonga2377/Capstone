import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Common/header";
import Footer from "./components/Common/footer";
import HomePage from "./components/Home";
import GamesPage from "./components/Game";
import MarketplacePage from "./components/Marketplace";
import CommunityPage from "./components/Community";
import LibraryPage from "./components/Library";
import SignInPage from "./components/Singin";
import SingleGame from "./components/SingleGame";
import UserProfilePage from "./components/User-profile";
import AboutUsPage from "./components/AboutUs";
import Register from "./components/Register/index";
import ForgotPassword from "./components/Forgot-password";
import ResetPassword from "./components/Reset-password";
import SingleBlog from "./components/Community/SingleBlog";
import Checkout from "./components/Checkout/index";
import TransactionPage from "./components/Transactions/TransactionPage";
import "./assets/css/bootstrap.min.css";
import "./App.css";
import "./assets/css/style.css";
import CartPage from "./components/Cart";
import WishlistPage from "./components/Wishlist/WishlistPage";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/games/:title" element={<SingleGame />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/community/:id" element={<SingleBlog />} /> 
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/Checkout" element={<Checkout />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
