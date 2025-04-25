import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  // Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "./scenes";
import UserDetails from "./scenes/AllUsers";
import Category from "./scenes/category";
import Login from "./components/Login";
import MenuTabs from "./custom/multipleTabs";
import PrivateRoute from "./utils/PrivateRoute";
import Products from "./scenes/products/Products";
import Orders from "./scenes/order/order";
import StaticPage from "./scenes/staticPage/staticContentPage"
import Feedback from "./scenes/rating&Reviews/RatingReviews";
import PartsVideos from "./scenes/PartsVideo/PartsVideos";
import OEMManagement from "./scenes/OEM/OEMManagement";

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        <Route element={<PrivateRoute />}>
        <Route path="/" element={<App />}>
        <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<MenuTabs />} />
            <Route path="/category" element={<Category />} />
            <Route path="/customers" element={<UserDetails />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/staticPage" element={<StaticPage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/part-video" element={<PartsVideos/>} />
            <Route path="/oem-management" element={<OEMManagement/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
