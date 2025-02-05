// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import MatchPage from "./pages/MatchPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </Router>
  );
};

export default App;