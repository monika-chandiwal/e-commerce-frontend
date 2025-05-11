import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Login from "./Pages/Login";
import Signup from "./Pages/signup";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./Common/ThemeProvider.jsx";
import OAuth2RedirectHandler from "./Pages/OAuth2RedirectHandler.jsx";
import ContactUs from "./Common/ContactUs.jsx";
import AboutUs from "./Components/AboutUs.jsx";
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </ThemeProvider>
);
