// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kontakt from "./pages/Kontakt";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Impressum from "./pages/Impressum";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contact" element={<Kontakt />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/impressum" element={<Impressum />} />
    </Routes>
  </Router>
);
