import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import BookPage from "./screens/BookPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookPage />} />
      </Routes>
    </Router>
  );
};

export default App;
